import React from "react";
import "./style.css"
function Canvas() {
  return (
    <div id="frame" className="frame">
      <h2 className="title">TESTO</h2>
      <div className="subframe">
        <div className="container">
          <canvas
            id="canvas"
            // width="670"
            // height="470"
            // style={{"background-color": "#ffffff"}}
          ></canvas>
          <a
            href="##"
            id="downloader"
            className="btn"
            onclick="downloadMerged()"
          >
            Confirm!
          </a>
          <a href="##" id="refresher" className="btn refresh" onclick="init()">
            Refresh!
          </a>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
