function scorePopReset() {
  scorePop=[];
}

function scorePopMotion() {
  for(var i=0;i<scorePop.length;i++) {
    scorePop[i].life--;
    if(scorePop[i].life<0) {
      scorePop[i].readyToRemove=true;
    }
  }
  for(var i=scorePop.length-1;i>=0;i--) {
    if(scorePop[i].readyToRemove) {
      scorePop.splice(i,1);
    }
  }
}