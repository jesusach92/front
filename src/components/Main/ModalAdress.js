import {Button, Modal} from 'react-bootstrap'
import AddAdressSup from '../Supplies/Adress/AddAdressSup'

const ModalAdress = ({show,handleClose,idSupplie}) =>{
	return(
		<Modal show={show} onHide={handleClose} size="lg"> 
			<Modal.Header closeButton>
				<Modal.Title>Agregar Domicilio</Modal.Title>
			</Modal.Header> 
			<Modal.Body>
				<AddAdressSup FkSupplieAd={idSupplie}></AddAdressSup>
			</Modal.Body>
			<Modal.Footer>
		  	<Button variant="primary" onClick={handleClose}>Cerrar</Button>
			</Modal.Footer>
		</Modal>       
	)
}
export default ModalAdress;