import {Form, Row, Button, Col, Table} from 'react-bootstrap'
import NavBar from './NavBar'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import AddProduct from './AddProduct'


const SearchProduct =(props)=>{
    const URI="http://localhost:3001/productos"
    const [products, setProducts] = useState([]);
    const [originProducts, setoriginProducts] =useState([]);
    const [search, setSearch] = useState("");
    const [showAddP, setAddP] = useState(false)
    const handleClose = ()=>{setAddP(false)
         getProducts()}
    const handleShow = ()=>setAddP(true)
    
    const filtrar =(props)=>
    {
        let resultSearching=originProducts.filter((element)=>{
            if(element.productName.toString().toLowerCase().includes(props.toLowerCase())||
            element.descriptionProduct.toString().toLowerCase().includes(props.toLowerCase())||
            element.nameTechnology.toString().toLowerCase().includes(props.toLowerCase())){
                return element;
            }
        })
        setProducts(resultSearching)
    }

    const HandleChange =e=>{
        setSearch(e.target.value)
        filtrar(e.target.value)
    }

    const resetSearch =()=>{
        setSearch("")
        setProducts(originProducts)
    }


    useEffect(()=>{
        getProducts()
    },[])

    const getProducts = async ()=>{
        const result = await axios.get(URI);
        setProducts(result.data);
        setoriginProducts(result.data);
    }
//Retorno de Componente condicionado    
    return (
        <div className="container-side p-0">    
        <NavBar brand={props.brand}/>
        <div className="container px-3 pt-3">
               <Form>
               <Form.Group as={Row} className="">
                <Form.Label column='true' sm={3} className="mt-3">Busqueda de Producto :</Form.Label>
                <Col className="pt-3">
                <Form.Control sm={4} value={search || ''} placeholder="Busqueda por Palabras clave" onChange={HandleChange}></Form.Control>
                </Col>
                <Col sm={1}>
                <Button className="btn btn-success mt-3" sm={1} onClick={resetSearch}>Limpiar</Button>
                </Col>
                <Col>
                <AddProduct show={showAddP} handleCloseP={handleClose}/>
                <Button variant="success" className="mt-3" sm={2} onClick={handleShow} >Agregar Producto</Button>
                </Col>
               </Form.Group>
               </Form>
               <div className="container pt-3">
                   Mostrando {products.length} Resultados
                   <div className="container">
                       <Table responsive hover>
                           <thead>
                               <tr>
                                   <th>Nombre de Producto</th>
                                   <th>Descripcion de Producto</th>
                                   <th>Tecnologia</th>
                                   <th>Consultar Proveedores</th>
                               </tr>
                           </thead>
                           <tbody>
                               {products.map((product) => (
                                   <tr key={product.idProduct}>
                                       <td>{product.productName}</td>
                                       <td>{product.descriptionProduct}</td>
                                       <td>{product.nameTechnology}</td>
                                       <td>
                                           <Link to={`/productos/proveedores/${product.idProduct}`} className = "btn btn-primary">Ver Proveedores</Link>
                                       </td>
                                   </tr>
                               ))}
                           </tbody>
                       </Table>
                   </div>
               </div>
             </div>
             </div>
    )
    
}
export default SearchProduct;