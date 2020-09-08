import React, { useEffect, useState } from "react";
import "./style.css";
import PNG1 from "./1.png";
import PNG2 from "./2.png";
import PNG3 from "./4.png";
import SVG1 from "./1.svg";
import MyModal from "./Modal";
var stage;

function Canvas() {
  const [lgShow, setLgShow] = useState(false);
  const [href, sethref] = useState("");
  const [download, setdownload] = useState("");
  const [photo, setphoto] = useState("");
  useEffect(() => {
    init();
    return () => init();
  }, []);

  //INITIAL FUNCTION
  function init() {
    var canvas = document.getElementById("canvas");
    stage = new window.createjs.Stage(canvas);

    AddImage(PNG1);
    AddImage(PNG2);
    AddImage(PNG2);
    AddImage(PNG3);
    
    // AddSVG(SVG1);

    stage.update();
  }

  //IMAGE SECTION
  function AddImage(src) {
    var image = new Image();
    image.src = src;
    image.crossOrigin = "Anonymous";
    image.onload = handleImageLoad;
    stage.update();
  }
  function handleImageLoad(event) {
    var image = event.target;
    var bitmap = new window.createjs.Bitmap(image);

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

  //SVG SECTION
  function AddSVG(src) {
    var image = new Image();
    image.src = src;
    image.crossOrigin = "Anonymous";
    image.onload = handleSVGLoad;
    stage.update();
  }
  function handleSVGLoad(event) {
    var image = event.target;
    var bitmap = new window.createjs.Bitmap(image);

    bitmap.x = getRandomInt(-50, 400);
    bitmap.y = getRandomInt(1, 250);

    // bitmap.x = -60;
    // bitmap.y = 1;

    //size of item
    // bitmap.scaleX = bitmap.scaleY = 0.5;
    bitmap.scaleX = bitmap.scaleY = getRandomInt(3, 5) / 10;

    //AllowDrag
    allowDrag(bitmap);
    console.log(bitmap, "bitmap");
    stage.addChild(bitmap);
    stage.update();
  }
  //DRAG SECTION
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
  //GET A RANDOM FROM TO
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  //Download
  function setDownload() {
    
    setdownload("The Best Canvas In The World.png");
    sethref(
      document
        .getElementById("canvasNew")
        .toDataURL("image/png")
        .replace(/^data:image\/[^;]/, "data:application/octet-stream")
    );
  }

  function downloadMerged() {
    hideButtons();
    console.log("downloadMerged Called");
    //PrintDiv
    window
      .html2canvas(document.querySelector("#frame"), {
        //styling
        windowWidth: document.querySelector("#frame").scrollWidth+100,
        windowHeight: document.querySelector("#frame").scrollHeight,
      })
      .then((canvas) => {
        canvas.id = "canvasNew";
        // canvas.width="auto"
        canvas.style = "";
        document.body.appendChild(canvas);
        document.getElementById("modalBody").appendChild(canvas);
        setphoto(canvas)
       

        showButtons();
        setDownload();

        //Cleanout
        // document.body.removeChild(canvas);
      });
  }
  //BUTTONS
  function hideButtons() {
    document.getElementById("downloader").style = "display:none";
    document.getElementById("refresher").style = "display:none";
  }
  function showButtons() {
    document.getElementById("downloader").style = "display:block";
    document.getElementById("refresher").style = "display:block";
  }

  return (
    <>
      <div id="frame" className="frame">
        <h2 className="title">LA TUA CANVAS</h2>
        <div className="subframe">
          <div className="my-container">
            <canvas id="canvas" width="1085" height="600"></canvas>
            <MyModal
              downloadFN={downloadMerged}
              download={download}
              href={href}
              canvas={photo}
            />
            <a
              href="##"
              id="refresher"
              className="btn btn-warning rounded-pill refresh"
              onClick={init}
            >
              Refresh!
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Canvas;
