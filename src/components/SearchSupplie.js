import {Form, Row, Button, Col, Table} from 'react-bootstrap'
import NavBar from './NavBar'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


const URI = "http://localhost:3001/Proveedores"



const SearchSupplie =(props) => {
    
    const [supplies, setSupplies] = useState([])
        useEffect (() =>{
            getSupplies()
        },[])
    
        const getSupplies = async () => {
            const result = await axios.get(URI);
            setSupplies(result.data);
        }
    

    return (
        <div className="container-side p-0">
        <NavBar brand={props.brand}></NavBar>
        <div className="container px-3 pt-3">
               <Form className="searchbox p-3">
                <Form.Label>Busqueda por:</Form.Label>
                <div className="flex">
                <Form.Group column className="mx-2">
                     <Form.Label as={Row} className="my-2">Nombre de Proveedor: </Form.Label>
                     <Form.Label as={Row}className="my-2">País: </Form.Label>
                     <Form.Label as={Row}className="my-2">Producto: </Form.Label>
                </Form.Group>
                <Form.Group className="mx-2">
                    <Form.Control className="my-2"></Form.Control>
                    <Form.Control className="my-2"></Form.Control>
                    <Form.Control className="my-2"></Form.Control>
                </Form.Group>
                <Form.Group className="mx-2">
                    <Form.Label as={Row} className="my-2">Nombre de Contacto: </Form.Label>
                    <Form.Label as={Row} className="my-2">Correo: </Form.Label>
                    <Form.Label as={Row} className="my-2">Tipo de Negocio: </Form.Label>
                </Form.Group>
                <Form.Group className="mx-2">
                    <Form.Control className="my-2"></Form.Control>
                    <Form.Control className="my-2"></Form.Control>
                    <Form.Control className="my-2"></Form.Control>
                </Form.Group>
                <Form.Group className="mx-2">
                <Form.Label as={Row} className="my-2">Palabras Clave: </Form.Label>
                </Form.Group>
                <Form.Group className="mx-2">
                    <Form.Control className="my-2"></Form.Control>
                    <Form.Group className="pt-4 my-2">
                    <Button className="btn btn-primary sm-btn mx-2">Limpiar</Button>
                    <Button className="btn btn-secondary sm-btn mx-2">Buscar</Button>
                    </Form.Group>
                </Form.Group>
                </div>
               </Form>
             </div>
             <div className="Results container pt-3">
                Mostrando Resultados
                <div className="container">
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>Nombre de Proveedor</th>
                                <th>Tipo de Negocio</th>
                                <th>Pais</th>
                                <th>Contacto Principal</th>
                                <th>Telefono</th>
                                <th>Correo</th>
                                <th>Domicilios</th>
                                <th>Contactos</th>
                                <th>Productos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supplies.map((supplie) => (
                                <tr key={supplie.id}>
                                    <td>{supplie.supplie_name}</td>
                                    <td>{supplie.nameBusiness}</td>
                                    <td>{supplie.adress_country}</td>
                                    <td>{supplie.name_contact}</td>
                                    <td>{supplie.cellphone_number}</td>
                                    <td>{supplie.contact_email}</td>
                                    <td>
                                        <Link to={`/Domicilios/Proveedor/${supplie.id_supplie}`} className="btn btn-primary center">Consultar</Link>
                                    </td>
                                    <td>
                                    <Link to={`/Domicilios/Proveedor/${supplie.id_supplie}`} className="btn btn-success">Consultar</Link>
                                    </td>
                                    <td>
                                    <Link to={`/Domicilios/Proveedor/${supplie.id_supplie}`} className="btn btn-info">Consultar</Link>
                                    </td>
                                </tr>
    ))}
                        </tbody>
                    </Table>
                </div>
             </div>
             </div>
    )
    
}
export default SearchSupplie;