import { useState } from 'react';
import {Button, Modal, Tab, Table, Tabs} from 'react-bootstrap'
import AddContacAdress from '../Supplies/Adress/AddContacAdress';

const ModalContact = ({show,handleClose,idAdress}) =>{
	const [Contacts, setContacts] =useState([""])
	const [key, setKey] = useState('contact0');
	const handleDelete =(indexToDelete)=>{
		let copyContacts = Contacts.filter((d, index) => index !== indexToDelete);
		if(copyContacts.length <=0){setContacts([""])}
		else{setContacts(copyContacts)}
		setKey('contact0')
	}
	return(
		<Modal show={show} onHide={handleClose} size="lg"> 
			<Modal.Header closeButton>
				<Modal.Title>Agregar contacto</Modal.Title>
			</Modal.Header> 
			<Modal.Body>
			{idAdress !== 0 ?
	(
	<div className="mt-3">
		<Button variant="success" onClick={e=>setContacts([...Contacts,""])}>Agregar Contacto</Button>
		<Tabs 
		id="controlled-tab-example"
	  	activeKey={key}
	  	onSelect={(k) => setKey(k)}
	  	className="mb-3 mt-3"
		>
			
		{Contacts.map((contact,index) =>( 
		<Tab
		key={index}
		title={`Contacto Numero ${index+1}`}
		eventKey={`contact${index}`}
		>
		<AddContacAdress FkAdressCont={idAdress} id={index} handleDelete={handleDelete}></AddContacAdress>
		</Tab>
		))}
		</Tabs>
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
			</Modal.Body>
			<Modal.Footer>
		  	<Button variant="primary" onClick={handleClose}>Cerrar</Button>
			</Modal.Footer>
		</Modal>       
	)
}
export default ModalContact;