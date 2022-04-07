import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { ATH } from '../const/Const'

const AddTechnologies = ({show,handleClose}) => {
    const [data, setData] = useState({
        nameTechnology:""
    })

    const sendData = async()=>{
        if(data !== "")
        {
            console.log(data)
            const result= await axios.post(ATH,data)
            console.log(result.data)
        if(result.data.value === 1)
        {
            alert("Tipo de Domicilio guardado correctamente")
            handleClose()
            setData({
                nameTechnology:""
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
                Agregar Tecnologia
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group as={Row}>
                <Form.Label >Tecnologia</Form.Label>
                <Col>
                <Form.Control value={data.nameTechnology} onChange={(e) => setData({nameTechnology:e.target.value})}/>
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

export default AddTechnologies