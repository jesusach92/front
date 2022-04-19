import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import AddContacAdress from '../Supplies/Adress/AddContacAdress'

const ModalContactUpdate = ({show, handleClose, contact}) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Agregar Domicilio</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <AddContacAdress contact={contact} handleClose={handleClose}></AddContacAdress>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalContactUpdate