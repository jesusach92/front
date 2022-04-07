import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { AAT } from '../const/Const'

const AddTypeAdress = ({show,handleClose}) => {
    const [data, setData] = useState({
        aType:""
    })

    const sendData = async()=>{
        if(data.aType !== "")
        {
            const result= await axios.post(AAT,data)
        if(result.data.value === 1)
        {
            alert("Tipo de Domicilio guardado correctamente")
            handleClose()
            setData({
                aType:""
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
                Agregar Tipo de Domicilio
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group as={Row}>
                <Form.Label >Tipo de Domicilio</Form.Label>
                <Col>
                <Form.Control value={data.aType} onChange={(e) => setData({aType:e.target.value})}/>
                </Col>
                </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="success" onClick={sendData}>Agregar Domicilio</Button>

          </Modal.Footer>
      </Modal>
 )
}

export default AddTypeAdress