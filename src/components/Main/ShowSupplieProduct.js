    import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {Table,Form,Row, Col, Button} from 'react-bootstrap'
import NavBar from "./NavBar";
import ModalAsing from "./ModalAsing";
import { PBI, SBF } from "../const/Const";

const ShowSupplieProduct = (props) => {
    const {id}= useParams()
    const URI =`http://localhost:3001/Producto/Proveedores/${id}`
    const [product, setProduct] = useState([])
    const [supplie, setsupplie] = useState(0)
    const [supplies, setSupplies] = useState([])
    const [Asing, setAsing] =useState([])
    const [show, setShow] = useState(false)
    const handleClose = () =>setShow(false)
    const HandleClick = ()=>{
        alert("Funcion en Desarrollo")
    }
    useEffect (()=>
    {
        getData()
        getAsing()
    },[])

useEffect(()=>
{
    if(supplies)
    {
        supplies.forEach(element => {
            let DateInital = element.pDateInitial.split('T')
            let DateUpdate = element.pDateUpdate.split('T')
            element.pDateInitial=DateInital[0]
            element.pDateUpdate=DateUpdate[0]
        })
    }
},[supplies])

    const getAsing = async ()=>
    {
        const supAsing = await axios.get(SBF)
        setAsing(supAsing.data)
    }
    const getData = async ()=>
    {
        const result= await axios.get(URI)
        const product=await axios.get(`${PBI}${id}`)
        setSupplies(result.data)
        setProduct(product.data[0])
    }

//Componente para Renderizado condicional
    return (
        <div className="container-side p-0">
            <NavBar brand={props.brand}></NavBar>
            <div className="container px-3 pt-3 "> 
            <Form>
                <Form.Group as={Row} className="mb-3 " >
                <Form.Label column sm={2}>
                    Nombre del Producto:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control type="text" plaintext readOnly value={product.productName ||  ''}  />
                </Col>
                <Form.Label column sm={2}>
                    Descripcion del Producto:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control as="textarea" rows={2} plaintext readOnly value={product.descriptionProduct ||  ''}  />
                </Col>
                <Form.Label column sm={2}>
                    Tecnologia:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control  plaintext readOnly value={product.nameTechnology ||  ''}  />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 " >
                    <Col sm={2}>
                {/* <Link to= {`/Producto/Agregar/Proveedor/${product.id_product}`} className="btn btn-primary ">Asignar Proveedor</Link> */}
                
                {/*Funcion por Asignar */} <Button onClick={HandleClick}>Editar Producto</Button>
                </Col>
                <Col>
                <Form.Select onChange={e=>setsupplie(Number(e.target.value))}>
                    <option value={0}>Selecciona un Proveedor para Asignar</option>
                    {Asing.map((asing)=>(
                        <option key={asing.idSupplie} value={asing.idSupplie}>{asing.nameSupplie}</option>
                    ))
                    }
                </Form.Select>
                </Col>
                <Col>
                    <ModalAsing show={show} handleClose={handleClose} idProduct={product.idProduct} idSupplie={supplie}></ModalAsing>
                    <Button disabled={supplie === 0} className="btn btn-success" onClick={e=>setShow(true)}>Asignar Proveedor</Button>
               
                </Col>
                </Form.Group>
            </Form>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Proveedor</th>
                        <th>Tiempo de Entrega</th>
                        <th>Linea de Producto</th>
                        <th>Comentarios</th>
                        <th>Precio</th>
                        <th>Fecha de Registro</th>
                        <th>Fecha de Actualizacion</th>
                        <th>Muestra Fisica</th>
                        <th>contactos</th>
                    </tr>
                </thead>
                {<tbody>
                    {supplies.map((supplie)=>(
                        <tr key={supplie.idSupply}>
                            <td>{supplie.nameSupplie}</td>
                            <td>{supplie.deliveryTime}</td>
                            <td>{supplie.productLine}</td>
                            <td>{supplie.comments}</td>
                            <td>{supplie.price}</td>
                            <td><div className="size">{supplie.pDateInitial}</div></td>
                            <td><div className="size">{supplie.pDateUpdate}</div></td>
                            <td>{supplie.pSampleLocation}</td>
                            <td>
                                <Link to={`/Domicilios/Proveedor/${supplie.idSupplie}`} className="btn btn-outline-primary">Ver</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>}

            </Table>
            </div>
        </div>
        )
}
export default ShowSupplieProduct;
