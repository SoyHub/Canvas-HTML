var stage;
var exporter;






function init() {
  var canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);

  AddImage("./1.png");
  AddImage("./2.png");
  AddImage("./1.png");
  AddImage("./4.png");
  // addSVG2(stage);
  
  stage.update();
}
function AddImage(src) {
  var image = new Image();
  image.src = src;
  image.crossOrigin = "Anonymous";
  image.onload = handleImageLoad;
  stage.update();
}
function handleFileLoad(event) {
  var item = event.item; // A reference to the item that was passed in to the LoadQueue
  var type = item.type;

  // Add any images to the page body.
  if (type == createjs.Types.IMAGE) {
    document.body.appendChild(event.result);
  }
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function handleImageLoad(event) {
  var image = event.target;
  var bitmap = new createjs.Bitmap(image);

  // bitmap.x = -60;
  bitmap.x = getRandomInt(-50, 400);
  bitmap.y = getRandomInt(1, 250);
  // bitmap.y = 1;

  //size of item
  // bitmap.scaleX = bitmap.scaleY = 0.5;
  bitmap.scaleX = bitmap.scaleY = getRandomInt(3, 10) / 10;

  //AllowDrag
  allowDrag(bitmap);
  console.log(bitmap, "bitmap");
  stage.addChild(bitmap);
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
 
    //NOT SURE IF TIS A GOOD IDEA
    downloadMerged()
    //
    
    stage.update();
  });
  item.addEventListener("pressup", function (event) {
    var sX = Math.floor(event.stageX);
    var sY = Math.floor(event.stageY);
  });
}
function addSVG2(stage) {
  var imageManifest = [
    { id: "MySvgImage", src: "2.svg" },
    { id: "MySvgImage2", src: "3.png" },
  ];

  // var stage = new createjs.Stage("canvas");

  var assetQueue = new createjs.LoadQueue(true, null, true);
  assetQueue.on("complete", complete);
  assetQueue.on("error", function (e) {
    console.log(e);
  });
  assetQueue.loadManifest(imageManifest);

  function complete(e) {
    // DOESN'T WORK
    var svg = assetQueue.getResult("MySvgImage");
    var svg2 = assetQueue.getResult("MySvgImage2");
    // document.body.appendChild(svg);
    console.log(svg, "svg");
    svg.viewBox = "0 0 700 550";
    var svgImage = new createjs.Bitmap(svg);
    var svgImage2 = new createjs.Bitmap(svg2);
    svgImage.x = svgImage.y = 200;
    svgImage.scaleX = svgImage.scaleY = 0.5;
    svgImage2.scaleX = svgImage2.scaleY = 0.2;
    svgImage.matrix = { a: 0.5, b: 0, c: 0, d: 0.5, tx: 200, ty: 200 };
    allowDrag(svgImage);
    allowDrag(svgImage2);
    stage.addChild(svgImage);
    stage.addChild(svgImage2);

    console.log(svgImage, "svgImage");
    createjs.Ticker.addEventListener("tick", stage);
    stage.update();
    console.log(stage, "stage");
  }
}

function setDownload() {
  document.getElementById("downloader").download =
    "The Best Canvas In The World.png";
  document.getElementById("downloader").href = document
    .getElementById("canvasNew")
    .toDataURL("image/png")
    .replace(/^data:image\/[^;]/, "data:application/octet-stream");
  document.getElementById("downloader").innerText = "Make Art!";
}

function hideButtons(){
  document.getElementById("downloader").style = "display:none";
  document.getElementById("refresher").style = "display:none";
}
function showButtons(){
  document.getElementById("downloader").style = "display:block";
  document.getElementById("refresher").style = "display:block";
}



function downloadMerged() {
  hideButtons()

  //PrintDiv
  html2canvas(document.querySelector("#frame"), {
    //styling
    windowWidth: document.querySelector("#frame").scrollWidth,
    windowHeight: document.querySelector("#frame").scrollHeight,
  }).then((canvas) => {
    canvas.id = "canvasNew";
    canvas.style = "display:none";
    document.body.appendChild(canvas);
    // console.log(canvas);

    showButtons()
    setDownload()

    //Cleanout
    document.body.removeChild(canvas);
  });
}
