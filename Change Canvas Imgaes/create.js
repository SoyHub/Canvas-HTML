// Code goes here
var stage;
function init() {
  var canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);

  createImage("https://images.unsplash.com/photo-1596785231809-a90a89c0ef47?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max");
  createImage("https://images.unsplash.com/photo-1597679441957-233da416c807?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max");
  createImage("https://source.unsplash.com/random");

  //Update stage will render next frame
  stage.update();
}

function allowDrag(item){
  item.addEventListener("mousedown", function (event) {
    var sX = Math.floor(event.stageX);
    var sY = Math.floor(event.stageY);
    item.dX = sX - item.x;
    item.dY = sY - item.y;
  });
  item.addEventListener("pressmove", function (event) {
    var sX = Math.floor(event.stageX);
    var sY = Math.floor(event.stageY);
    item.x = sX - item.dX;
    item.y = sY - item.dY;
    if (item.x > 90 && item.x < 110 && item.y > 90 && item.y < 110) {
      item.x = 100;
      item.y = 100;
    }
    stage.update();
  });
  item.addEventListener("pressup", function (event) {
    var sX = Math.floor(event.stageX);
    var sY = Math.floor(event.stageY);
  });
}

function createImage(src) {
  var image = new Image();
  image.crossOrigin = "Anonymous";
  image.src= src;
  
  //Create image
  var img = new createjs.Bitmap(image);
  //Set position of Shape instance.
  img.x = img.y = 20;
  img.scaleX=0.1;
  img.scaleY=0.1;

  //AllowDrag
  allowDrag(img);

  stage.addChild(img);

}
