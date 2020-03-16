// simple MS-DOS style terminal with "DIR" etc
// based on work by https://github.com/eosterberg/terminaljs

const promptDOS = "A:\\>";
const promptBBS = "Main Menu: ";

var incomingModemData = ""; // COM1 buffer =)
var TerminalOutput = null; // this._output
var onBBS = false;

// animate like a 1200 baud modem, 150 bytes per second
function ModemPoll() { 

    var delay = 0; // extra "lag"
    var outputSomething = false;
    if (incomingModemData && incomingModemData.length) {
        var char = incomingModemData[0];
        // special case: we need all 4 bytes at once
        if (incomingModemData.startsWith("&gt;")) { char = "&gt;"; }
        if (incomingModemData.startsWith("&lt;")) { char = "&lt;"; }
        
        TerminalOutput.innerHTML += char; // output one char
        outputSomething = true;
        
        incomingModemData = incomingModemData.substr(char.length); // remove from COM1 buffer
        // special fx: go slower if there's a ... in the text
        if (char=='.' && incomingModemData[0]=='.') delay = 500;
    }

    // just finished?
    if (incomingModemData=="" && outputSomething) {
        console.log("Finished printing all incoming modem data.");
        if (pendingBufferedCommand) {
            console.log("Running a pending buffered command: " + pendingBufferedCommand);
            commandDotCom(pendingBufferedCommand);
            pendingBufferedCommand = null;
        }
    }

    setTimeout(ModemPoll,(1000/150)+delay); // 1200 baud is 150 bytes per second
}

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
        var shouldPrintInput = false; // $CTK don't output after hitting enter
		var inputField = document.createElement('input');
		inputField.style.position = 'absolute';
		inputField.style.zIndex = '-100';
		inputField.style.outline = 'none';
		inputField.style.border = 'none';
		inputField.style.opacity = '0';
		inputField.style.fontSize = '0.2em';

		terminalObj._inputLine.textContent = '';
		terminalObj._input.style.display = 'inline-block';
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
				if (shouldPrintInput) terminalObj.print(inputValue)
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

		this._innerWindow = document.createElement('span');//'div');
		this._output = document.createElement('span');//'p');
		this._inputLine = document.createElement('span'); //the span element where the users input is put
		this._cursor = document.createElement('span');
		this._input = document.createElement('span');//p'); //the full element administering the user input, including cursor

        this._shouldBlinkCursor = true;
        
        TerminalOutput = this._output;

        this.cls = function() {
            this._output.innerHTML = "";
        }
        
        this.modem = function (message) { // same as print except teletype animation
            incomingModemData += message;
        }

////////////////////////////////////////////////////////////////
        this.print = function (message) {
////////////////////////////////////////////////////////////////            
            
            // pre mode - pretty easy! instant, WORKS!
            // this._output.innerHTML += message;

            this.modem(message);
            
            /*
            // block divs aplenty
            var msgs = message.split('\n');
            for(num in msgs) {
                var newLine = document.createElement('div');
                if (msgs[num]=="") 
                    msgs[num]=="&nbsp;"; // blank line
                newLine.textContent = msgs[num];//message;
                this._output.appendChild(newLine);
            }
            */
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

        // CSS inits
        this._input.appendChild(this._inputLine);
		this._input.appendChild(this._cursor);
		this._innerWindow.appendChild(this._output);
		this._innerWindow.appendChild(this._input);
		this.html.appendChild(this._innerWindow);
		//this.setBackgroundColor('black');
		this.setTextColor('rgba(0,200,64,1)');
		this.setTextSize('22px');
		this.setWidth('100%');
		this.setHeight('100%');
		this.html.style.fontFamily = 'BlockZone, Monaco, Courier, Terminal';
        this.html.style.margin = '0';
        this.html.style.whiteSpace = "pre"; 
        this.html.style.overflow = "hidden";
		this._innerWindow.style.padding = '0px';
		this._input.style.margin = '0';
		this._output.style.margin = '0';
        this._output.style.overflow = "hidden";
        this._cursor.style.background = 'rgba(0,200,64,1)';
		this._cursor.innerHTML = 'C'; //put something in the cursor..
		this._cursor.style.display = 'none'; //then hide it
        this._input.style.display = 'none';
        this.html.style.lineHeight = '16px';
        this.html.style.letterSpacing = '-1px'; // to avoid small gaps
	}

	return TerminalConstructor;
}());

var t1 = new MSDOS();
var pendingBufferedCommand = "";
function commandDotCom(input) {
    
    input = input.toUpperCase();
    input = input.replace(".EXE", "");

    if (input=="DEFRAG2") {
        TerminalOutput.innerHTML = "<div style='position:absolute; margin:0; padding:0; top:4px; left:0px; line-height:16px;'>" +  TerminalOutput.innerHTML + "</div>";
        pendingBufferedCommand = null;
        // start drawing on top in a new pre
    } else { // normal:
        if (input=="DEFRAG") { 
            pendingBufferedCommand = "DEFRAG2"; 
        } else {
            pendingBufferedCommand = null;
        }
        t1.cls(); // clear
    }
    
    if (input=="?") input = "HELP";
    if (input=="") input = "HELP";
    if (input=="LS") input = "DIR";

    if (input=="BBS") onBBS = true;

    // special commands
    if (input=="EXIT" ||
        input=="QUIT" ||
        input=="BACK") {
        console.log("User requested that we QUIT.");
        // FIXME: prompt y/n?
        window.history.back();
    }
    
    // find a hidden pre in the html
    var found = document.getElementById(input);
    if (found) {
        console.log("found command: " + input);
        console.log("found text: " + found.innerHTML);
        t1.print(found.innerHTML.trimLeft()); // trimmed because our PREs have leading crlf
    } else {
        t1.print('Unknown command or file name: ' + input + '.EXE\n');
    }
    
    if (!pendingBufferedCommand) t1.input(onBBS?promptBBS:promptDOS, commandDotCom);
}

function init(e) {

    console.log("INIT!");
    
    document.getElementById('monitor').appendChild(t1.html);
    
    
    commandDotCom("BOOT");

    ModemPoll();
    
}

window.addEventListener("load",init);