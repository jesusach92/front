import { Button, Modal } from "react-bootstrap";
import AsingProductSup from "../Supplies/Products/AsingProductSup";

const ModalAsing = ({ show, handleClose, idSupplie, idProduct, Supply }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Asignar Proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AsingProductSup
          idP={idProduct}
          idSupplie={idSupplie}
          handleClose={handleClose}
          Supply={Supply}
        ></AsingProductSup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalAsing;
