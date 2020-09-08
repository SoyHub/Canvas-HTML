import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./style.css"
function MyModal({ downloadFN, download, href, canvas }) {
  const [lgShow, setLgShow] = useState(false);
  useEffect(() => {
      try {
          document.getElementById("modalBody").appendChild(canvas);
          
      } catch (error) {
          
      }
    console.log(canvas)
    return () => {};
  }, []);
  console.log(canvas)

  return (
    <>
      <a
        href="##"
        id="downloader"
        className="btn btn-warning rounded-pill stretched-link"
        onClick={() => {
          setLgShow(true);
          downloadFN();
        }}
      >
        Confirm!
      </a>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        id="modalBody"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg"></Modal.Title>
        </Modal.Header> */}
        {/* <Modal.Body ></Modal.Body> */}
        {/* <Modal.Footer> */}
          <a
            href={href}
            download={download}
            className="btn btn-warning rounded-pill stretched-link makeArt"
          >
            Make Art!
          </a>
        {/* </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default MyModal;
