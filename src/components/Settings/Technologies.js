import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { ATH, TEC } from '../const/Const'

const Technologies = () => {
    const [technologies, setTech]=useState([])
    const [show, setShow]= useState(false)
    const [data, setData] = useState({
        nameTechnology:""
    })

    const getData = async ()=>{
        const {data} = await axios.get(TEC)
        setTech(data)
    }

    const sendData = async()=>{
        if(data !== "")
        {
            console.log(data)
            const result= await axios.post(ATH,data)
            console.log(result.data)
        if(result.data.value === 1)
        {
            alert("Tipo de Domicilio guardado correctamente")
            setShow(false)
            setData({
                nameTechnology:""
            })
        }
        }
        else{
            alert("No puedes enviar texto vacio")
        }
    }
    useEffect(()=>{
        getData()
    },[])

  return (
    <Col>
    <h5>Tecnologias de Productos</h5>	
    <Table responsive hover>
        <thead>
            <tr>
                <th>Clasificacion de Tecnologias</th>
                <th><Button variant='success' onClick={e=>setShow(true)}>Agregar</Button></th>
            </tr>
        </thead>
        {technologies.length === 0  ? (
        <tbody>
            <tr>
                <th>No hay Tecnologias registradas</th>
            </tr>
        </tbody>):
        (<tbody>
        {technologies.map((type)=>(
            <tr key={type.idTechnology}>
                <td value={type.nameTechnology} >{type.nameTechnology}</td> 
                <td><Button>Editar</Button></td>
            </tr>))}                       
        </tbody>)
        }
    </Table>
    <Modal show={show} onHide={e=>setShow(false)} >
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
          <Button variant="primary" onClick={e=>setShow(false)}>
            Cerrar
          </Button>
          <Button variant="success" onClick={sendData}>Agregar</Button>
          </Modal.Footer>
      </Modal>
</Col>

      
 )
}

export default Technologies