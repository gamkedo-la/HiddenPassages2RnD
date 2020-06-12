const WORLD_W = 40;
const WORLD_H = 40;
const WORLD_GAP = 2;
const WORLD_COLS = 20;
const WORLD_ROWS = 15;
var levelOne =  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
				 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2,
				 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2,
				 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2,
				 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2,
				 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2,
				 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2,
				 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2,
				 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2,
				 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2,
				 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2,
				 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2,
				 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
var worldGrid = [];

var tileGrass = {
	imageID: 1,
	block: 'Full',
  };

var tileTree = {
	imageID: 2,
	block: 'Full',
  };

var tileWall = {
	imageID: 3,
	block: 'Full',
  };

var tileHouse = {
	imageID: 4,
	block: 'Full',
  };
const TILE_GRASS = 0;
const TILE_WALL = 1;
const TILE_TREE = 2;
const TILE_HOUSE = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;
const TILE_SHEEP = 7;
const TILE_COYOTE = 6;
var mapGrid = [];

function initWorld(){

	//draw the grid size and make everything to grass
	for (var posX=0; posX<WORLD_COLS; posX++) {
	  mapGrid[posX] = [];

	  for (var posY=0; posY<WORLD_ROWS; posY++) {
		mapGrid[posX][posY] = tileGrass;
	  }
	}

	//draw trees around the map
	for (var posX=0; posX<WORLD_COLS; posX++) {
		mapGrid[posX][0] = tileTree;
		mapGrid[posX][WORLD_ROWS-3] = tileTree;
	}
	for (var posY=0; posY<WORLD_ROWS-3; posY++) {
		mapGrid[0][posY] = tileTree;
		mapGrid[WORLD_COLS-1][posY] = tileTree;
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

function tileTypeHasTransparency(checkTileType) {
	return (checkTileType == TILE_WALL ||
			checkTileType == TILE_TREE ||
			checkTileType == TILE_DOOR);
}

function drawWorld() {
	
	//var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
		for(var indexX=0;indexX<WORLD_COLS;indexX++) {
			for(var indexY=0;indexY<WORLD_ROWS;indexY++) {
				canvasContext.drawImage(imageList[mapGrid[indexX][indexY].imageID],drawTileX,drawTileY);
				drawTileY += WORLD_H;
			}
			drawTileX += WORLD_W;
			drawTileY = 0;
		}
		/*	var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = imageList[tileKindHere];

			if( tileTypeHasTransparency(tileKindHere) ) {
				canvasContext.drawImage(imageList[TILE_GRASS],drawTileX,drawTileY);
			}
			canvasContext.drawImage(useImg,drawTileX,drawTileY);
			drawTileX += WORLD_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += WORLD_H;
		drawTileX = 0;
	} // end of for each row*/

} // end of drawWorld func