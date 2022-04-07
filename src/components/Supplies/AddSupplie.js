import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { BST, SCT } from '../const/Const'
import NavBar from '../NavBar'


const AddSupplie = (props) => {

    
    const [businessType, setBusiness] = useState([])
    const [sclasificacion, setsclasificacion] = useState([])

    const getData = async ()=>
    {
        const business = await axios.get(BST)
        const sclas = await axios.get(SCT)
        setsclasificacion(sclas.data)
        setBusiness(business.data)
        console.log(business)
    }
    useEffect (()=>{
        getData()
    },[])

    return (
    <div className="container-side p-0">
        <NavBar brand= {props.brand}/>
        <div  className="container pt-3">
            <Form className="mt-3">
                <Form.Group as={Row}>
                <Form.Label column='true' sm={3}>
                    <h5>Registro de Proveedor</h5>
                </Form.Label>    
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column='true' sm={3}>
                    Nombre de Proveedor:
                    </Form.Label>
                    <Col sm={3}>
                    <Form.Control />
                    </Col>
                    <Form.Label column='true' sm={3}>
                    Tipo de Negocio:
                    </Form.Label>
                    <Col sm={3}>
                    <Form.Select>
                        <option>Selecciona un tipo de Negocio{console.log(businessType)}</option>
                        {businessType.map((type) => (
                        <option key={type.idBusinessType} value={type.bName}>{type.bName}</option> 
                         
                        ))}
                    </Form.Select>
                    </Col>
                    <Form.Label column='true' sm={3}>
                    Nombre de Proveedor:
                    </Form.Label>
                    <Col sm={3}>
                    <Form.Control />
                    </Col>
                    <Form.Label column='true' sm={3}>
                    Nombre de Proveedor:
                    </Form.Label>
                    <Col sm={3}>
                    <Form.Control />
                    </Col>
                </Form.Group>
            </Form>            
        </div>

    </div>
  )
}

export default AddSupplie
     