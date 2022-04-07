import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {Table,Form,Row, Col, Button} from 'react-bootstrap'
import NavBar from "./NavBar";

const ShowProductsSupplie = (props)=>{

    const {id} = useParams()
    const URI=  `http://localhost:3001/proveedores/productos/${id}`
    const [products, setProducts] = useState([])
    const [supplie, setSupplie] = useState([])

    useEffect (()=>{
        getProducts()
    },[])

    const getProducts = async ()=>{
        const result = await axios.get(URI)
        setProducts(result.data)
        setSupplie(result.data[0])
    }
    const HandleClick = ()=>{
        alert("Funcion en Desarrollo")
    }

    //Retorno del renderizado condicional
    return(

        <div className="container-side p-0">
            <NavBar brand={props.brand}></NavBar>
            <div className="container px-3 pt-3 "> 
            <Form>
                <Form.Group as={Row} className="mb-3 " >
                <Form.Label column sm={2}>
                    Nombre de Proveedor:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control as="textarea" rows={2} plaintext readOnly value={supplie.supplie_name ||  ''}  />
                </Col>
                </Form.Group>
                <Form.Group>
                {/* <Link to= {`/Agregar/Domicilio/${supplie.id_supplie}`} className="btn btn-primary ">Agregar Domicilio</Link> */}
                <Button className="btn btn-warning" onClick={HandleClick}>Agregar Producto</Button>
                <Link to= {`/Domicilios/Proveedor/${supplie.id_supplie}`} className="btn btn-success mx-3">Mostrar Domicilio</Link>
                </Form.Group>
            </Form>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Nombre del Producto</th>
                        <th>Descripcion</th>
                        <th>Tiempo de Entrega</th>
                        <th>Tipo de Entrega</th>
                        <th>Comentarios</th>
                        <th>Editar Relacion</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>(
                        <tr key={product.idsupply}>
                            <td>{product.productName}</td>
                            <td>{product.description_product}</td>
                            <td>{product.delivery_time}</td>
                            <th>{product.product_line}</th>
                            <td>{product.comments}</td>
                            <td>
                                {/* <Link to={`/Contactos/Proveedor/${product.idsupply}`} className="btn btn-outline-primary">Editar</Link> */}
                                <Button className="btn btn-warning" onClick={HandleClick}>Editar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
            </div>
        </div>
    )

}
export default ShowProductsSupplie