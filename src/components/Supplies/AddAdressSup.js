import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Form, Row, Table } from "react-bootstrap"
import { AAS, TAD } from "../const/Const"
import AddContacAdress from "./AddContacAdress"

const initialValuesA ={
    FkSupplieAd:0,
    FkadressType:0,
    adressCountry:"",
    adressState:"",
    adressDescription:"",
    aComments:""
}

const AddAdressSup = ({FkSupplieAd}) => {
	const [typeAd , setTypeAd] = useState([]) 
	const [dataA, setData] = useState({...initialValuesA,FkSupplieAd:FkSupplieAd})
    const [idAdress, setIDAdrees] = useState({id:0})
    const [Contacts, setContacts] =useState([])
	
	const getData= async()=>
	{
	const addaType = await axios.get(TAD)
	setTypeAd(addaType.data)
	}
	useEffect(() => {
	  getData()
	},[])

	const SendData= async ()=>
    {
        if(dataA.FkSupplieAd !== 0 && dataA.FkadressType !== 0 && dataA.adressCountry !== "")
        {
            const {data}= await axios.post(AAS,dataA)
            if(data.value === 1)
        {
            window.alert("Domicilio guardado correctamente")
            setIDAdrees({id:data.insertId})
        }
        }
        else{window.alert("Todos los campos tienen que estar llenos")}
    }
	
	return (
        <div className="container border p-2 pt-0 mt-3">
	<Form>
		<Form.Group as={Row} className='mt-2'>
        	<Form.Label>
                Agregar Domicilio a Proveedor
            </Form.Label>
        </Form.Group>
        <Form.Group as={Row}>
                    <Form.Label column='true' sm={3} >Tipo de Domicilio:</Form.Label>
                    <Col sm={5}>
                    <Form.Select onChange={(e)=>{setData({...dataA,FkadressType:Number(e.target.value)})}}>
                        <option>Selecciona el tipo de domicilio</option>
                        {typeAd.map((type)=>(<option value={type.idadressType} key={type.idadressType}>{type.aType}</option>))}
                    </Form.Select>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-4">
                    <Form.Label column='true' sm={2}>País:</Form.Label>
                    <Col sm={4}>
                    <Form.Control onChange={(e)=>{setData({...dataA,adressCountry:e.target.value})}} value={dataA.adressCountry || ""}/>
                    </Col>
                    <Form.Label column sm={2}>Estado o Provincia:</Form.Label>
                    <Col sm={4}>
                    <Form.Control onChange={(e)=>{setData({...dataA,adressState:e.target.value})}} value={dataA.adressState || ""}/>
                    </Col>
                    </Form.Group>
                <Form.Group as={Row} className='mt-2'>
                    <Form.Label column sm={9} >Direccion:</Form.Label>
					<Col sm={12}>
                    	<Form.Control as='textarea' rows={2} value={dataA.adressDescription || ""} onChange={(e)=>{setData({...dataA,adressDescription:e.target.value})}}></Form.Control>
                    </Col>
					<Form.Label column sm={9}>Comentarios:</Form.Label>
                    <Col sm={12}>
					<Form.Control  as='textarea' value={dataA.aComments || ""} onChange={(e)=>{setData({...dataA,aComments:e.target.value})}}></Form.Control>
					</Col>
				</Form.Group>
				<Form.Group className="mt-2">
					<Col>
						<Button variant='primary' onClick={SendData}>Guardar</Button>
					</Col>
				</Form.Group>
    </Form>
    {idAdress.id !== 0 ?
    (
    <div className="mt-3">
        <Button variant="success" onClick={e=>setContacts([...Contacts,""])}>Agregar Contacto</Button>
        {Contacts.map(contact =>(
            
        <AddContacAdress FkAdressCont={idAdress.id} id={contact}></AddContacAdress>))}
    </div>
    )
    :
    (
    <Table>
        <thead>
        	<tr>
				<th>Registrar Contacto</th>
            </tr>
        </thead>
		<tbody>
			<tr>
				<td>Guardar el Domicilio para poder Registrar el contacto</td>
			</tr>
		</tbody>
    </Table>)}
    </div>
  )
}

export default AddAdressSup