const TILE_W = 40;
const TILE_H = 40;
const WORLD_ROWS = 20;
const WORLD_COLS = 15;

var mapGrid = [];

var wallDistance = 2;

var playArea = {
	startX: 1,
	startY: 1,
	endX: WORLD_ROWS-2,
	endY: 12,
	menuIDX: 7,
	menuIDY: 14
  };

var menuBar = {
	startX: indexXtoPixelX(7),
	startY: indexYtoPixelY(14)
};
var farmSpawner ={
	xID: WORLD_ROWS/2 - 1,
	yID: playArea.endY -1
};

function updateMapGrid(){
	//draw the grid size and make everything to grass
	for (var posX = 0; posX < WORLD_ROWS; posX++) {
	  mapGrid[posX] = [];

	  for (var posY = 0; posY < WORLD_COLS; posY++) {
		mapGrid[posX][posY] = tileGrass;
	  }
	}

	//draw trees around the map
	for (var posX = 0; posX < WORLD_ROWS; posX++) {
		mapGrid[posX][0] = tileTree;
		mapGrid[posX][playArea.endY] = tileTree;
	}
	for (var posY = 0; posY < playArea.endY; posY++) {
		mapGrid[0][posY] = tileTree;
		mapGrid[WORLD_ROWS-1][posY] = tileTree;
	}

	//draw the wall
	for (var posY = 0; posY < playArea.endY; posY++) {
		if(posY != 0){
			mapGrid[WORLD_ROWS/2 - 1 - wallDistance][posY] = tileWall;
			mapGrid[WORLD_ROWS/2 + wallDistance][posY] = tileWall;
		}
	}

	//place the house
	mapGrid[WORLD_ROWS/2 - 1][playArea.endY] = tileHouse;

	//place the animals
	if(animalList != undefined && animalList.length > 0){
		animalList.forEach (function (val,index){
			mapGrid[val.indexX][val.indexY] = animalList[index];
		});
	}
	if(menuList != undefined && menuList.length > 0){
		menuList.forEach (function (val,index){
			mapGrid[val.indexX][val.indexY] = menuList[index];
		});
	}

}

function drawWorld() {
	//var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
		for(var indexX=0;indexX<WORLD_ROWS;indexX++) {
			for(var indexY=0;indexY<WORLD_COLS;indexY++) {
				if(mapGrid[indexX][indexY].transparent) {
					drawAnImage(tileGrass.imageID,drawTileX,drawTileY,0);
				}
				if (mapGrid[indexX][indexY].imageID != undefined){
				drawAnImage(mapGrid[indexX][indexY].imageID,drawTileX,drawTileY,0);
				}else{
					console.log("IMAGE ID ERROR ON tile X:" + indexX + " Y: " + indexY);
				}
				drawTileY += TILE_H;
			}
			drawTileX += TILE_W;
			drawTileY = 0;
		}
}

//Get the Pixel coordinate of a grid index for Y
function indexXtoPixelX(idX) {
	var indexX = idX * TILE_W;
	if(indexX >= 0 && indexX < WORLD_ROWS * TILE_W){
		return indexX;
	}

	console.log("indexXtoPixelX: not in area");
	return undefined;
}

//Get the Pixel coordinate of a grid index for X
function indexYtoPixelY(idY) {
	var indexY = idY * TILE_H;
	if(indexY >= 0 && indexY < WORLD_COLS * TILE_H){
		return indexY;
	}

	console.log("indexXtoPixelX: not in area");
	return undefined;
}

//Get the grid Index of a pixel position for X
function pixelXtoindexX(atX) {
	var indexX = Math.floor(atX / TILE_W);
	if(atX >= 0 && atX < WORLD_ROWS * TILE_W){
		return indexX;
	}

	console.log("indexXtoPixelX: not in area");
	return undefined;
}

//Get the grid Index of a pixel position for Y
function pixelYtoindexY(atY) {
	var indexY = Math.floor(atY / TILE_H);
	if(atY >= 0 && atY < WORLD_COLS * TILE_H){
		return indexY;
	}

	console.log("indexYtoPixelY: not in area");
	return undefined;
}

//Rest the position to the nearest tile for X
function resetPixelXtoNearestIndexX(pixX){
	return indexXtoPixelX(pixelXtoindexX(pixX));
}

//Rest the position to the nearest tile for Y
function resetPixelYtoNearestIndexY(pixY){
	return indexYtoPixelY(pixelYtoindexY(pixY));
}
