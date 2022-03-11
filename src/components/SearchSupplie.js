import {Form, Row, Col, Button} from 'react-bootstrap'
const SearchSupplie =()=>{
    return (
        <div className="container px-3 pt-3">
               <Form className="searchbox p-3">
                <Form.Label>Busqueda por:</Form.Label>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="auto">Nombre de Proveedor:</Form.Label>
                    <Col sm><Form.Control></Form.Control></Col>
                    <Form.Label column sm="auto">Nombre de Contacto:</Form.Label>
                    <Col sm><Form.Control></Form.Control></Col>
                    <Form.Label column sm="auto">Palabras Clave: </Form.Label>
                    <Col sm><Form.Control></Form.Control></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">País:</Form.Label>
                    <Col sm="2"><Form.Control></Form.Control></Col>
                    <Form.Label column sm="auto">Estado: </Form.Label>
                    <Col sm="2"><Form.Control></Form.Control></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Producto:</Form.Label>
                    <Col sm="3"><Form.Control></Form.Control></Col>
                    <Form.Label column sm="auto">Tipo de Negocio: </Form.Label>
                    <Col sm="2"><Form.Control></Form.Control></Col>
                    <Col><Button variant="primary" size="small">Limpiar</Button></Col>
                    <Col><Button variant="secondary" size="small">Buscar</Button></Col>
                </Form.Group>
               </Form>
             </div>
    )
    
}
export default SearchSupplie;