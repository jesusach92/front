import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { ACS } from '../const/Const'

const AddSClasification = ({show,handleClose}) => {
    const [data, setData] = useState({
        clasificationName:""
    })

    const sendData = async()=>{
        if(data !== "")
        {
            console.log(data)
            const result= await axios.post(ACS,data)
            console.log(result.data)
        if(result.data.value === 1)
        {
            alert("Clasificacion de Proveedor Guardada Exitosamente")
            handleClose()
            setData({
                clasificationName:""
            })
        }
        }
        else{
            alert("No puedes enviar texto vacio")
        }
    }

  return (
      <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>
                Agregar Clasificacion de Proveedor
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group as={Row}>
                <Form.Label >Clasificacion de Proveedor</Form.Label>
                <Col>
                <Form.Control value={data.clasificationName} onChange={(e) => setData({clasificationName:e.target.value})}/>
                </Col>
                </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="success" onClick={sendData}>Agregar</Button>

          </Modal.Footer>
      </Modal>
 )
}

export default AddSClasification