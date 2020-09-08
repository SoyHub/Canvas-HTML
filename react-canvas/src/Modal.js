import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function MyModal() {
  const [lgShow, setLgShow] = useState(false);
  return (
    <>
      <a href="##" id="downloader" className="btn" onClick={() => setLgShow(true)}>
        Confirm!
      </a>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>This is the modal body</Modal.Body>
      </Modal>
    </>
  );
}

export default MyModal;
