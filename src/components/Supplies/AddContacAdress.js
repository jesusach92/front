import { useState } from "react"
import { Col, Form, Row } from "react-bootstrap"

const initialValues = {
    FkAdressCont:0, 
    nameContact:"", 
    workposition:"", 
    officeNumber:"", 
    cellphoneNumber:"", 
    comments:""
}

const AddContacAdress = ({FkAdressCont, id}) => {
  const [data, setData] = useState({...initialValues,FkAdressCont:FkAdressCont})
    return (
    <div >
    	<Form>
			<Form.Label>Agregar Contacto a Domicilio</Form.Label>
        </Form>
		<Form.Group as={Row}>
		<Form.Label column sm={3}>Nombre de Contacto numero {console.log(id)}</Form.Label>
		<Col sm={4}>
			<Form.Control/>
		</Col>
		</Form.Group>
    </div>
  )
}

export default AddContacAdress