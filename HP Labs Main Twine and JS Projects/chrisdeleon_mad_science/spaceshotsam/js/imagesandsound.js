function loadImagesSoundsAndStartMusic() {
  bgImg = new Image();
  playerImg = new Image();
  enemyImg = new Image();
  platImg = new Image();
  pupImg = new Image();
  bgImg.src = "img/background.png";
  playerImg.src = "img/dude.png";
  enemyImg.src = "img/badguy.png";
  platImg.src = "img/plat.png";
  pupImg.src = "img/powerup.png";

  enemyDieSnd = new Audio("snd/enemydie.mp3");
  jumpSnd = new Audio("snd/jump.mp3");
  landingSnd = new Audio("snd/landing.mp3");
  loseSnd = new Audio("snd/lose.mp3");
  mgFireSnd = new Audio("snd/mgfire.mp3");
  nextWaveSnd = new Audio("snd/nextwave.mp3");
  pickupSnd = new Audio("snd/pickup.mp3");
  shotblockedSnd = new Audio("snd/shotblocked.mp3");
  shotgunSnd = new Audio("snd/shotgun.mp3");
  
  /*musicSnd = new Audio("snd/song.mp3");
  musicSnd.loop = true;
  musicSnd.volume = 0.2;
  musicSnd.play();*/
}