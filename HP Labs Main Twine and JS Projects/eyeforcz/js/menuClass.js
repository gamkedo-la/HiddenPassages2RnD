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
		console.log(menuList.length)
		if(mouseAction.selected != undefined){
			for(var i = 0; i < mouseAction.selected.menuItems.length; i++){
				for(var j = 0; j < this.menuItemList.length; j++){
					if(this.menuItemList[j].block == mouseAction.selected.menuItems[i]){
						var	item ={
							typ: this.typ,
							block: this.menuItemList[j].block,
							needParams: this.menuItemList[j].needParams,
							imageID: this.menuItemList[j].imageIdIDLE,
							transparent: this.menuItemList[j].transparent,
							indexX: playArea.menuIDX + i,
							indexY: playArea.menuIDY
						};
						menuList.push(item);
					}
				}
			}
		}
		/*	mouseAction.selected.menuItems.forEach (function (selVal,selIndex){
				this.menuItemList.forEach (function (mVal,mIndex){
					if(mVal.block == selVal){
						var	item ={
							typ: this.typ,
							block: mVal.block,
							needParams: mVal.needParams,
							transparent: mVal.transparent,
							indexX: playArea.menuIDX + index,
							indexY: playArea.menuIDY
						};
						menuList.push(item);
					}
				});
			});
		}*/

	}

	this.draw = function(){
		if(mouseAction.selected != undefined){
			this.menuItemList.forEach (function (mVal,mIndex){
				if(mouseAction.action != undefined && mVal.block == mouseAction.action.block){
					drawAnImage(mVal.imageIdSEL, mVal.indexX, mVal.indexY, 0);
				}else{
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
}

