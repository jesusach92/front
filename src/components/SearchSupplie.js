import {Form, Row, Button, Col, Table} from 'react-bootstrap'
import NavBar from './NavBar'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'




const SearchSupplie =(props) => {

    const URI = "http://192.168.1.97:3001/proveedores"

    const filtrar =(props)=>
    {
        let resultSearching=tabSupplies.filter((element)=>{
            if(element.supplie_name.toString().toLowerCase().includes(props.toLowerCase())||
            element.nameBusiness.toString().toLowerCase().includes(props.toLowerCase())||
            element.adress_country.toString().toLowerCase().includes(props.toLowerCase())||
            element.name_contact.toString().toLowerCase().includes(props.toLowerCase())||
            element.contact_email.toString().toLowerCase().includes(props.toLowerCase())){
                return element;
            }

        })
        setSupplies(resultSearching)
    }

    const HandleChange =e=>{
        setSearch(e.target.value)
        filtrar(e.target.value)
    }

    const resetSearch =()=>{
        setSearch("")
        setSupplies(tabSupplies)
    }
    
    const [supplies, setSupplies] = useState([])
    const [tabSupplies, setTabSupplies] =useState([])
    const [search, setSearch] =useState("")
        useEffect (() =>{
            getSupplies()
        },[])
    
        const getSupplies = async () => {
            const result = await axios.get(URI);
            setSupplies(result.data);
            setTabSupplies(result.data);
        }
    

    return (
        <div className="container-side p-0">
        <NavBar brand={props.brand}></NavBar>
        <div className="container px-3 pt-3">
            <Form >
               <Form.Group as={Row} className="">
                <Form.Label column='true' sm={3} className="mt-3">Busqueda de Proveedor :</Form.Label>
                <Col className="pt-3">
                <Form.Control sm={4} value={search || ''} placeholder="Busqueda por Palabras clave" onChange={HandleChange}></Form.Control>
                </Col>
                <Col>
                <Button className="btn btn-success mt-3" sm={1} onClick={resetSearch}>Limpiar</Button>
                </Col>
               </Form.Group>
               </Form>
             </div>
             <div className="Results container pt-3">
                Mostrando {supplies.length} Resultados
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
                                <tr key={supplie.id_supplie}>
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