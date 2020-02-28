// simple MS-DOS style terminal with "DIR" etc
// based on work by https://github.com/eosterberg/terminaljs

const bootupTXT = 
"HomeTeam (R) HT-DOS Version 3.22\n"+
"Copyright (C) 1989-1998 HTGD Inc. All rights reserved.\n"+
"\n"+
"Volume in drive A is TOPSCRET\n"+
"Volume Serial Number is 9A3E-085C\n";

const dirTXT = 
"Volume in drive A is TOPSCRET\n"+
"Volume Serial Number is 9A3E-085C\n"+
"\n"+
"Directory of A:\n"+
"\n"+
"1998-05-31  10:29 AM    <DIR>          .\n"+
"1998-05-31  10:29 AM    <DIR>          ..\n"+
"1998-01-29  01:52 PM              1,024 DIR.EXE\n"+
"1998-01-29  01:52 PM              1,024 BBS.EXE\n"+
"               1 File(s)          4,096 bytes\n"+
"               2 Dir(s)         230,944 bytes free";

var MSDOS = (function () {

	var PROMPT_INPUT = 1, PROMPT_PASSWORD = 2, PROMPT_CONFIRM = 3;

	function flashCursor(inputField, terminalObj) {
		var cursor = terminalObj._cursor
		setTimeout(function () {
			if (inputField.parentElement && terminalObj._shouldBlinkCursor) {
				cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden' : 'visible';
				flashCursor(inputField, terminalObj);
			} else {
				cursor.style.visibility = 'visible';
			}
		}, 500)
	}

	var firstPrompt = true;

	function promptInput(terminalObj, message, PROMPT_TYPE, callback) {

		var shouldDisplayInput = (PROMPT_TYPE === PROMPT_INPUT);
		var inputField = document.createElement('input');
		inputField.style.position = 'absolute';
		inputField.style.zIndex = '-100';
		inputField.style.outline = 'none';
		inputField.style.border = 'none';
		inputField.style.opacity = '0';
		inputField.style.fontSize = '0.2em';

		terminalObj._inputLine.textContent = '';
		terminalObj._input.style.display = 'block';
		terminalObj.html.appendChild(inputField);
		
		flashCursor(inputField, terminalObj);

		if (message.length) terminalObj.print(PROMPT_TYPE === PROMPT_CONFIRM ? message + ' (y/n)' : message);

		inputField.onblur = function () {
			terminalObj._cursor.style.display = 'none';
		}

		inputField.onfocus = function () {
			inputField.value = terminalObj._inputLine.textContent;
			terminalObj._cursor.style.display = 'inline';
		}

		terminalObj.html.onclick = function () {
			inputField.focus();
		}

		inputField.onkeydown = function (e) {
			if (e.which === 37 || e.which === 39 || e.which === 38 || e.which === 40 || e.which === 9) {
				e.preventDefault()
			} else if (shouldDisplayInput && e.which !== 13) {
				setTimeout(function () {
					terminalObj._inputLine.textContent = inputField.value
				}, 1)
			}
		}
		inputField.onkeyup = function (e) {
			if (PROMPT_TYPE === PROMPT_CONFIRM || e.which === 13) {
				terminalObj._input.style.display = 'none'
				var inputValue = inputField.value
				if (shouldDisplayInput) terminalObj.print(inputValue)
				terminalObj.html.removeChild(inputField)
				if (typeof(callback) === 'function') {
					if (PROMPT_TYPE === PROMPT_CONFIRM) {
						callback(inputValue.toUpperCase()[0] === 'Y' ? true : false)
					} else callback(inputValue)
				}
			}
		}
		if (firstPrompt) {
			firstPrompt = false;
			setTimeout(function () { inputField.focus()	}, 50);
		} else {
			inputField.focus();
		}
	}

	var TerminalConstructor = function (id) {

		this.html = document.createElement('div');
		this.html.className = 'Terminal';
		if (typeof(id) === 'string') { this.html.id = id };

		this._innerWindow = document.createElement('div');
		this._output = document.createElement('p');
		this._inputLine = document.createElement('span'); //the span element where the users input is put
		this._cursor = document.createElement('span');
		this._input = document.createElement('p'); //the full element administering the user input, including cursor

		this._shouldBlinkCursor = true;

		this.print = function (message) {
            var msgs = message.split('\n');
            for(num in msgs) {
                var newLine = document.createElement('div');
                if (msgs[num]=="") 
                    msgs[num]=="&nbsp;"; // blank line
                newLine.textContent = msgs[num];//message;
                this._output.appendChild(newLine);
            }
		}

		this.input = function (message, callback) {
			promptInput(this, message, PROMPT_INPUT, callback);
		}

		this.password = function (message, callback) {
			promptInput(this, message, PROMPT_PASSWORD, callback);
		}

		this.confirm = function (message, callback) {
			promptInput(this, message, PROMPT_CONFIRM, callback);
		}

		this.clear = function () {
			this._output.innerHTML = '';
		}

		this.sleep = function (milliseconds, callback) {
			setTimeout(callback, milliseconds);
		}

		this.setTextSize = function (size) {
			this._output.style.fontSize = size;
			this._input.style.fontSize = size;
		}

		this.setTextColor = function (col) {
			this.html.style.color = col;
			this._cursor.style.background = col;
		}

		this.setBackgroundColor = function (col) {
			this.html.style.background = col;
		}

		this.setWidth = function (width) {
			this.html.style.width = width;
		}

		this.setHeight = function (height) {
			this.html.style.height = height;
		}

		this.blinkingCursor = function (bool) {
			bool = bool.toString().toUpperCase();
			this._shouldBlinkCursor = (bool === 'TRUE' || bool === '1' || bool === 'YES');
		}

		this._input.appendChild(this._inputLine);
		this._input.appendChild(this._cursor);
		this._innerWindow.appendChild(this._output);
		this._innerWindow.appendChild(this._input);
		this.html.appendChild(this._innerWindow);

		//this.setBackgroundColor('black');
		this.setTextColor('rgba(0,200,64,1)');
		this.setTextSize('16px');
		this.setWidth('100%');
		this.setHeight('100%');

		this.html.style.fontFamily = 'BlockZone, Monaco, Courier, Terminal';
		this.html.style.margin = '0';
		this._innerWindow.style.padding = '10px';
		this._input.style.margin = '0';
		this._output.style.margin = '0';
		this._cursor.style.background = 'rgba(0,200,64,1)';
		this._cursor.innerHTML = 'C'; //put something in the cursor..
		this._cursor.style.display = 'none'; //then hide it
		this._input.style.display = 'none';
	}

	return TerminalConstructor;
}());

var t1 = new MSDOS();

function commandDotCom(input) {
    if (input.toUpperCase()=="DIR") {
        t1.print(dirTXT);
    } else {
        t1.print('Unknown command or file name: ' + input);
        t1.print('//TODO: make stuff happen here');
    }
    
    t1.input('A:\> ', commandDotCom);
}

function init(e) {
    console.log("INIT!");
    
    document.getElementById('monitor').appendChild(t1.html)
    
    t1.print(bootupTXT, commandDotCom);
    
    t1.input('A:\> ', commandDotCom);
}

window.addEventListener("load",init);