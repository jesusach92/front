import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {Table,Form,Row, Col} from 'react-bootstrap'
import NavBar from "./NavBar";

const ShowSupplieProduct = (props) => {
    const {id}= useParams()
    const URI =`http://192.168.1.97:3001/productos/proveedores/${id}`
    console.log(URI)
    const [adress, setAdress] = useState([])
    const [supplie, setSupplie] = useState([])
  
    useEffect (()=>{
        getAdress()
    },[])

    const getAdress = async ()=>
    {
        const result= await axios.get(URI)
        setAdress(result.data)
        setSupplie(result.data[0])
        console.log(result.data)

    }
//Componente para Renderizado condicional
    return (
        <div className="container-side p-0">
            <NavBar brand={props.brand}></NavBar>
            <div className="container px-3 pt-3 "> 
            <Form>
                <Form.Group as={Row} className="mb-3 " >
                <Form.Label column sm={2}>
                    Nombre de Proveedor:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control type="text" plaintext readOnly value={supplie.supplie_name ||  ''}  />
                </Col>
                <Form.Label column sm={2}>
                    Tipo de Proveedor:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="text" plaintext readOnly value={supplie.nameBusiness ||  ''}  />
                </Col>
                <Form.Label column sm={2}>
                    Descripcion de Negocio:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" plaintext readOnly value={supplie.descriptionBusiness ||  ''}  />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 " >
                <Form.Label column sm={2}>
                    Domicilio Principal:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" plaintext readOnly value={supplie.adress_description ||  ''}  />
                </Col>
                <Form.Label column sm={2}>
                    País:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" plaintext readOnly value={supplie.adress_country ||  ''}  />
                </Col>
                <Form.Label column sm={2}>
                    Contacto Principal:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control type="text" plaintext readOnly value={supplie.name_contact ||  ''}  />
                </Col> 
                <Form.Label column sm={1}>
                    Puesto:
                </Form.Label>
                <Col sm={5}>
                    <Form.Control type="text" plaintext readOnly value={supplie.workposition ||  ''}  />
                </Col>
                <Form.Label column sm={2}>
                    Numero de Oficina:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control type="text" plaintext readOnly value={supplie.office_number ||  ''}  />
                </Col> 
                <Form.Label column sm={2}>
                    Numero Celular:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="text" plaintext readOnly value={supplie.cellphone_number ||  ''}  />
                </Col> 
                <Form.Label column sm={2}>
                    Correo Electronico:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control type="text" plaintext readOnly value={supplie.contact_email ||  ''}  />
                </Col>       
                </Form.Group >
                <Form.Group>
                <Link to= {`/Agregar/Domicilio/${supplie.id_supplie}`} className="btn btn-primary ">Agregar Domicilio</Link>
                <Link to= {`/Proveedor/Productos/${supplie.id_supplie}`} className="btn btn-success mx-3">Mostrar Productos</Link>
                </Form.Group>
            </Form>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>
                            Tipo de Domilicio
                        </th>
                        <th>
                            Direccion
                        </th>
                        <th>
                            País
                        </th>
                        <th>Contactos</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {adress.map((adres)=>(
                        <tr key={adres.id_adress}>
                            <td>{adres.adress_principal.data == 1 ?"Domicilio Principal":"Surcursal"}</td>
                            <td>{adres.adress_description}</td>
                            <td>{adres.adress_country}</td>
                            <td>
                                <Link to={`/Contactos/Proveedor/${adres.id_adress}`} className="btn btn-outline-primary">Ver</Link>
                            </td>
                        </tr>
                    ))}
                </tbody> */}

            </Table>
            </div>
        </div>
        )
}
export default ShowSupplieProduct;
