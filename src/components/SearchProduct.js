import {Form, Row, Col, Button} from 'react-bootstrap'
const SearchProduct =()=>{
    return (
        <div className="container px-3 pt-3">
               <Form className="searchbox p-3">
                <Form.Label>Busqueda por:</Form.Label>
                <Form.Group as={Row}>
                <Form.Label >Nombre:</Form.Label>
                <Form.Label >Compañia:</Form.Label>
                <Form.Label >Tipo de Producto:</Form.Label>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Control column/>
                    <Form.Control column/>
                    <Form.Control column/>
                </Form.Group>

               </Form>
             </div>
    )
    
}
export default SearchProduct;