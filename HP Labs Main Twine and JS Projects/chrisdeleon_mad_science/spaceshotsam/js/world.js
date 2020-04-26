mapLayout = '[{"x":206.94350187288012,"y":480.0555047546011,"w":107,"h":25},{"x":608.1286419988709,"y":97.00143341966992,"w":107,"h":25},{"x":429.3282869729617,"y":187.5958020800366,"w":107,"h":25},{"x":39.875955547498734,"y":496.7857806703389,"w":107,"h":25},{"x":366.99219606026475,"y":484.1210649689035,"w":107,"h":25},{"x":490.59362121499936,"y":491.37648216885765,"w":107,"h":25},{"x":668.9190613012993,"y":363.5207356743389,"w":107,"h":25},{"x":280.24147501002165,"y":329.4881062166073,"w":107,"h":25},{"x":503.5305471048233,"y":342.1192725939619,"w":107,"h":25},{"x":217.68519656949314,"y":171.0530526064133,"w":107,"h":25},{"x":643.704118715606,"y":509.45116406246245,"w":107,"h":25},{"x":25.31015601150508,"y":179.67542264053932,"w":107,"h":25},{"x":662.1047030649493,"y":174.75285341965233,"w":107,"h":25},{"x":87.45398787556817,"y":346.23917666031537,"w":107,"h":25},{"x":559.5374691316954,"y":249.75135014971875,"w":107,"h":25}]';

function worldReset() {
  enemiesToSpawn=1;
  additionalEnemiesPerLevel=3;

  plat = JSON.parse(
    mapLayout
  );

  /*
  platformNumber = 15;
  platW=107;
  platH=25;
  for(var i=0;i<platformNumber;i++) {
    var nextPlatCoord = safePlatSpawnNoOverlap();
    plat.push(
    {
    x:nextPlatCoord.x,
    y:nextPlatCoord.y,
    w:platW,
    h:platH
    }
    );
  }*/
}

function worldDraw() {
  for(var i=0;i<plat.length;i++) {
    drawImageFromTopLeft(platImg, plat[i].x,plat[i].y,false);
  }
}

function safePlatSpawnNoOverlap() {
  var testX,testY;
  var testLimit=500;
  var testBoxL,testBoxT,testBoxR,testBoxB;
  var platMarginX = 30;
  var platMarginY = 50;
  var overlapsAny;
  while(testLimit-- > 0) {
    testX = Math.random()*(canv.width-platW);
    testY = ph+Math.random()*(canv.height-platH-ph);
    testBoxL = testX-platMarginX;
    testBoxT = testY-platMarginY;
    testBoxR = testX+platW+platMarginX;
    testBoxB = testY+platH+platMarginY;
    overlapsAny = false;
    for(var i=0;i<plat.length;i++) {
      if((testBoxR<plat[i].x || testBoxL>plat[i].x+plat[i].w ||
         testBoxB<plat[i].y || testBoxT>plat[i].y+plat[i].h) == false) {
        overlapsAny=true;
        break;
      }
    }
    if(overlapsAny==false) {
      return {x:testX, y:testY};
    }
  }
  console.log("took too many retests to find a non-overlapping platform");
  return {x:testX, y:testY};
}

function pointOverlappedByRectList(testX,testY, rectList) {
  for(var i=0;i<rectList.length;i++) {
    if(testX>rectList[i].x && testX<rectList[i].x+rectList[i].w &&
      testY>rectList[i].y && testY<rectList[i].y+rectList[i].h) {
      return rectList[i];
    }
  }
  return null;
}