var warriorPic = document.createElement("img");
var imageList = [];

var picsToLoad = 0; // set automatically based on imageArray in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	//console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
}

function loadImageForWorldCode(worldCode, fileName) {
	imageList[worldCode] = document.createElement("img");
	beginLoadingImage(imageList[worldCode], fileName);
}

function loadImages() {
	var imageArray = [
		{imageID: tileGrass.imageID, theFile: "world_grass.png"},
		{imageID: tileTree.imageID, theFile: "world_tree.png"},
		{imageID: tileWall.imageID, theFile: "world_wall.png"},
		{imageID: tileHouse.imageID, theFile: "world_house.png"},
		{imageID: tileSheep.imageID, theFile: "object_sheep.png"},
		{imageID: tileCoyote.imageID, theFile: "object_coyote.png"},
		{imageID: tileBtnMoveTo.imageIdIDLE, theFile: "btn_moveto_IDLE.png"},
		{imageID: tileBtnMoveTo.imageIdSEL, theFile: "btn_moveto_SEL.png"},
		];

	picsToLoad = imageArray.length;

	for(var i=0;i<imageArray.length;i++) {
		if(imageArray[i].varName != undefined) {
			beginLoadingImage(imageArray[i].varName, imageArray[i].theFile);
		} else {
			loadImageForWorldCode(imageArray[i].imageID, imageArray[i].theFile);
		}
	}
}