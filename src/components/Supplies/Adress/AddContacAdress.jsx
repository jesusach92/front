import axios from "axios"
import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { ACA } from "../../const/Const"

const initialValues = {
	FkAdressCont:0, 
	nameContact:"", 
	workposition:"", 
	officeNumber:"", 
	cellphoneNumber:"", 
	comments:""
}

const AddContacAdress = ({FkAdressCont, id, handleDelete }) => {
  const [data, setData] = useState({...initialValues,FkAdressCont:FkAdressCont})  
  const [save , setSave] = useState(false)
  const handleText = (e)=>{
	const {name, value}=e.target
	let regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");
	  for(let i = 0; i < value.length; i++){
		let letra = value[i]
		  if(!regex.test(letra) || !letra === " "){return;}
	}
	setData({...data,[name] : value}); 
						  }
  const handleNumber = (e)=>{
	const {name, value}=e.target
	let regex = new RegExp("^[0-9]+$");
	  for(let i = 0; i < value.length; i++){
		let letra = value[i]
		  if(!regex.test(letra) || !letra === " "){return;}
  }
  setData({...data,[name] : value});
							}

  const sendData = async()=>{
	if(data.FkAdressCont !==0 && data.nameContact !=="" && data.workposition !== "" && data.officeNumber !== "" && data.cellphoneNumber !== "" && data.comments !==""){  
	try{
	const result= await axios.post(ACA,data)
	if(result.data.value === 1)
	{
		window.alert("Contacto Registrado Correctamente")
		setSave(true)
	}
		}
	catch(e)
	{console.log(e)}
	}
	else{alert("Todos los campos deben estar llenos")}
  }
	return (
	<div className="mt-3 mb-3" >
		<Form>
			<Form.Label>Agregar Contacto a Domicilio</Form.Label>
		</Form>
		<Form.Group as={Row}>
		<Form.Label column sm={2}>Nombre:</Form.Label>
		<Col sm={4}>
			<Form.Control placeholder="Nombre Completo" value={data.nameContact} name='nameContact' onChange={handleText}/>
		</Col>
	<Form.Label column sm={2}>Puesto:</Form.Label>
		<Col sm={4}>
			<Form.Control placeholder="Puesto Desempeñado" value={data.workposition} name='workposition' onChange={handleText}/>
		</Col>
		</Form.Group>
	<Form.Group as={Row} className='mt-3'>
		<Form.Label column sm={2}>Numero de Oficina:</Form.Label>
		<Col sm={4}>
			<Form.Control  placeholder="Numero de Oficina" value={data.officeNumber} name='officeNumber' maxLength="10" onChange={handleNumber}/>
		</Col>
	<Form.Label column sm={2}>Numero Celular:</Form.Label>
		<Col sm={4}>
			<Form.Control placeholder="Numero Celular" value={data.cellphoneNumber} name='cellphoneNumber' maxLength="10" onChange={handleNumber}/>
		</Col>
		</Form.Group>
	<Form.Group as={Row} className='mt-3'>
	<Form.Label column sm={4} className='mt-3'>Comentarios u Observaciones: </Form.Label>
		<Col sm={8}>
			<Form.Control placeholder="Comentarios importantes del contacto" as='textarea' value={data.comments} name='comments' onChange={handleText} />
		</Col>
	</Form.Group>
	<Form.Group as={Row} className='mt-3'>
	<Col>
	<Button onClick={sendData} disabled={save}>Guardar Contacto</Button>
	</Col>
	<Col>
	<Button variant="danger" onClick={e=>handleDelete(id)} disabled={save}>Borrar Contacto</Button>
	</Col>
	</Form.Group>
	
	</div>
  )
}

export default AddContacAdress