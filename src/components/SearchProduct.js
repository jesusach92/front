import {Form, Row, Button, Col, Table} from 'react-bootstrap'
import NavBar from './NavBar'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const URI="http://localhost:3001/Productos"
const SearchProduct =(props)=>{
    
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        getProducts()
    },[])

    const getProducts = async ()=>{
        const result = await axios.get(URI);
        setProducts(result.data);

    }


    
    return (
        <div className="container-side p-0">    
        <NavBar brand={props.brand}/>
        <div className="container px-3 pt-3">
               <Form>

               </Form>
               <div className="container pt-3">
                   Mostrando Resultados
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
                                   <tr key={product.id_product}>
                                       <td>{product.productName}</td>
                                       <td>{product.description_product}</td>
                                       <td>{product.nameTechnology}</td>
                                       <td>
                                           <Link to={`/Productos/${product.id_product}/Proveddores`} className = "btn btn-primary">Ver Proveedores</Link>
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