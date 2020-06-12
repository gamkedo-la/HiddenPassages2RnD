const WORLD_W = 40;
const WORLD_H = 40;
const WORLD_GAP = 2;
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
	block: 'Full',
	transparent: false,
  };

var tileTree = {
	tileType: 2,
	block: 'Full',
	transparent: true,
  };

var tileWall = {
	tileType: 3,
	block: 'Full',
	transparent: true,
  };

var tileHouse = {
	tileType: 4,
	block: 'Full',
	transparent: false,
  };

var objSheep = {
	tileType: 5,
	block: 'Full',
	transparent: true,
  };

var objCoyote = {
	tileType: 6,
	block: 'Full',
	transparent: true,
  };

function initWorld(){
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
				canvasContext.drawImage(imageList[mapGrid[indexX][indexY].tileType],drawTileX,drawTileY);
				drawTileY += WORLD_H;
			}
			drawTileX += WORLD_W;
			drawTileY = 0;
		}
}

function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < WORLD_COLS &&
		row >= 0 && row < WORLD_ROWS) {
		 var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		 return worldGrid[worldIndexUnderCoord];
	} else {
		return WORLD_WALL;
	}
}

function getTileIndexAtPixelCoord(atX, atY) {
	var warriorWorldCol = Math.floor(atX / WORLD_W);
	var warriorWorldRow = Math.floor(atY / WORLD_H);
	var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
		warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
		return worldIndexUnderWarrior;
	} // end of valid col and row

	return undefined;
} // end of warriorWorldHandling func

function rowColToArrayIndex(col, row) {
	return col + WORLD_COLS * row;
}
