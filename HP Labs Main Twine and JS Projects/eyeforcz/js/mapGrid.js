const WORLD_W = 40;
const WORLD_H = 40;
const WORLD_ROWS = 20;
const WORLD_COLS = 15;
const TREE_BORDER_Y = 13;

var mapGrid = [];

var wallDistance = 2;

var playArea = {
	startX: 1,
	startY: 1,
	endX: WORLD_ROWS-2,
	endY: 12,
  };

var tileGrass = {
	tileType: 1,
	block: 'GRASS',
	transparent: false,
  };

var tileTree = {
	tileType: 2,
	block: 'TREE',
	transparent: true,
  };

var tileWall = {
	tileType: 3,
	block: 'WALL',
	transparent: true,
  };

var tileHouse = {
	tileType: 4,
	block: 'HOUSE',
	transparent: false,
  };

var objSheep = {
	tileType: 5,
	block: 'SHEEP',
	transparent: true,
  };

var objCoyote = {
	tileType: 6,
	block: 'COYOTE',
	transparent: true,
  };

var farmSpawner ={
	xID: WORLD_ROWS/2 - 1,
	yID: playArea.endY -1
}

function initMapGrid(){
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

}

function drawWorld() {
	//var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
		for(var indexX=0;indexX<WORLD_ROWS;indexX++) {
			for(var indexY=0;indexY<WORLD_COLS;indexY++) {
				if(mapGrid[indexX][indexY].transparent) {
					canvasContext.drawImage(imageList[tileGrass.tileType],drawTileX,drawTileY);
				}
				if (mapGrid[indexX][indexY].tileType != undefined){
				canvasContext.drawImage(imageList[mapGrid[indexX][indexY].tileType],drawTileX,drawTileY);
				}
				drawTileY += WORLD_H;
			}
			drawTileX += WORLD_W;
			drawTileY = 0;
		}
}

//Get the Pixel coordinate of a grid index for Y
function indexXtoPixelX(idX) {
	var indexX = idX * WORLD_W;
	if(indexX >= 0 && indexX < WORLD_ROWS * WORLD_W){
		return indexX;
	}

	console.log("indexXtoPixelX: not in area");
	return undefined;
}

//Get the Pixel coordinate of a grid index for X
function indexYtoPixelY(idY) {
	var indexY = idY * WORLD_H;
	if(indexY >= 0 && indexY < WORLD_COLS * WORLD_H){
		return indexY;
	}

	console.log("indexXtoPixelX: not in area");
	return undefined;
}

//Get the grid Index of a pixel position for X
function pixelXtoindexX(atX) {
	var indexX = Math.floor(atX / WORLD_W);
	if(atX >= 0 && atX < WORLD_ROWS * WORLD_W){
		return indexX;
	}

	console.log("indexXtoPixelX: not in area");
	return undefined;
}

//Get the grid Index of a pixel position for Y
function pixelYtoindexY(atY) {
	var indexY = Math.floor(atY / WORLD_H);
	if(atY >= 0 && atY < WORLD_COLS * WORLD_H){
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
