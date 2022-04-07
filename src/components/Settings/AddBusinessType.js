import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { ABT } from '../const/Const'

const initialValues={
    bName:"",
    bDescription:""
}

const AddBusinessType = ({show,handleClose}) => {
    const [data, setData] = useState(initialValues)

    const sendData = async()=>{
        console.log(data)
        if(data.bName !== "" && data.bDescription !== "")
        {
        const result= await axios.post(ABT,data)
        if(result.data.value === 1)
        {
            alert("Tipo de Negocio guardado correctamente")
            handleClose()
            setData(initialValues)
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
                Agregar Tipo de Negocio
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group as={Row}>
                <Form.Label >Tipo de Negocio</Form.Label>
                <Col>
                <Form.Control placerholder="El Tipo de Negocio no debe tener más de 10 letras" value={data.bName} onChange={(e) => setData({...data,bName:e.target.value})}/>
                </Col>
                <Form.Label >Descripcion del Negocio</Form.Label>
                <Col>
                <Form.Control as="textarea" rows={2} value={data.bDescription} onChange={(e) => setData({...data,bDescription:e.target.value})}/>
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

export default AddBusinessType