var menuList = [];

menuClass = new function(){
	this.typ = 'BUTTON';
	this.x = indexXtoPixelX(playArea.menuIDX);
	this.y = indexYtoPixelY(playArea.menuIDY);
	this.menuItemList = [
		moveToe ={
			imageIdIDLE: 7,
			imageIdSEL: 8,
			block: 'MOVETO',
			needParams: true,
			transparent: true
		},
	];

	this.move = function(){
	}

	this.draw = function(){
		if(mouseAction.selected != undefined){
			this.menuList.forEach (function (mVal,mIndex){
				if(mouseAction.action != undefined && mVal.block == mouseAction.action.block){
					console.log("here1");
					drawAnImage(mVal.imageIdSEL, mVal.indexX, mVal.indexY, 0);
				}else{
					console.log("here2");
					drawAnImage(mVal.imageIdIDLE, mVal.indexX, mVal.indexY, 0);
				}
			});
		}
	}

	//If the object is selected than this menu pops up
	this.menu = function(){
		//TODO: make a menu class and a menu array for this class
		drawAnImage(btnMoveTo.imageIdIDLE, menuBar.startX, menuBar.startY,0);
	}

	this.initSelectMenu = function(){
		if(mouseAction.selected != undefined){
			this.menuList = [];
			for(var i = 0; i < mouseAction.selected.menuItems.length; i++){
				for(var j = 0; j < this.menuItemList.length; j++){
					if(this.menuItemList[j].block == mouseAction.selected.menuItems[i]){
						var	item ={
							typ: this.typ,
							block: this.menuItemList[j].block,
							needParams: this.menuItemList[j].needParams,
							imageIdIDLE: this.menuItemList[j].imageIdIDLE,
							imageIdSEL: this.menuItemList[j].imageIdSEL,
							transparent: this.menuItemList[j].transparent,
							indexX: playArea.menuIDX + i,
							indexY: playArea.menuIDY
						};
						menuList.push(item);
						console.log(menuList)
					}
				}
			}
		} 
	}

	this.run = function(idX, idY){
		
		switch (mouseAction.action.block) {
			case 'MOVETO':
				return mouseAction.selected.moveTo(idX,idY);
				break;	
		}


	}
}

