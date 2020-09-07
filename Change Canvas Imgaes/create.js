// Code goes here
var stage;

function init() {
  var canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);

  AddImage("./kitarou.png");
  AddImage("./1.png");
  AddImage("./2.png");
  AddImage("./3.png");

  //Update stage will render next frame
  stage.update();
}
function AddImage(src) {
  var image = new Image();
  image.src = src;
  image.crossOrigin = "Anonymous";
  image.onload = handleImageLoad;
  stage.update();
}

function allowDrag(item) {
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

function handleFileLoad(event) {
  var item = event.item; // A reference to the item that was passed in to the LoadQueue
  var type = item.type;

  // Add any images to the page body.
  if (type == createjs.Types.IMAGE) {
    document.body.appendChild(event.result);
  }
}

function handleImageLoad(event) {
  var image = event.target;
  var bitmap = new createjs.Bitmap(image);
 
  //place on screen
  bitmap.x = bitmap.y = 200;

  //size of item
  bitmap.scaleX = 1;
  bitmap.scaleY = 1;

  //AllowDrag
  allowDrag(bitmap);
  stage.addChild(bitmap);
  stage.update();
}

