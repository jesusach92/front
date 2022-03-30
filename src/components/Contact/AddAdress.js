import { useEffect, useState } from 'react'
import {Table,Form,Row, Col, Button, Modal} from 'react-bootstrap'
import axios from 'axios'


const AddAdress = ({show,handleClose,idSupplie}) =>
{
    const AType = 'http://192.168.1.97:3001/TiposDom'
    const [data, setData] = useState({
        FkSupplieAd:idSupplie,
        FkadressType:0,
        adressCountry:'Mexico',
        adressState:'',
        adressDescription:'',
        aComments:''

    })
    const [adType, setAdType]=useState([])
    const getData = async ()=>
    {
        const result= await axios.get(AType)
        setAdType(result.data)
    }

    useEffect(()=>
    {
        getData()
    },[])
    return(
           <Modal show={show} onHide={handleClose} size="lg"> 
                <Modal.Header closeButton>
                <Modal.Title>Agregar Domicilio</Modal.Title>
            </Modal.Header> 
            <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Tipo de Domicilio</Form.Label>
                    <Form.Select>
                        <option>Selecciona el tipo de domicilio</option>
                        {adType.map((type)=>(<option key={type.idadressType}>{type.aType}</option>))}
                        
                    </Form.Select>
                    <Form.Label>
                        País
                    </Form.Label>
                    <Form.Control name='adressCountry' value={data.adressCountry} onChange={(e)=>setData({...data,adressCountry:(e.target.value)})}></Form.Control>
                </Form.Group>
            </Form>    
        </Modal.Body>
                <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
                </Modal>       
    )
}
export default AddAdress;