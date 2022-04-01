import { useEffect, useState } from 'react'
import {Form,Row, Col, Button, Modal} from 'react-bootstrap'
import axios from 'axios'



const AddAdress = ({show,handleClose,idSupplie}) =>
{
    const AType = 'http://192.168.1.97:3001/TiposDom'
    const SDT= 'http://192.168.1.97:3001/agregar/domicilio'
    const [adType, setAdType]=useState([])
    const [data, setData] = useState({
        FkSupplieAd:Number(idSupplie),
        FkadressType:null,
        adressCountry:null,
        adressState:null,
        adressDescription:null,
        aComments:null

    })
    const getData = async ()=>
    {
        const result= await axios.get(AType)
        setAdType(result.data)
    }


    const SendData= async ()=>
    {
        console.log(data)
        if( !(data.FkadressType==null || data.adressCountry==null || data.adressState==null || data.adressDescription==null || data.aComments==null))
        {
            const result= await axios.post(SDT,data)
         if(result.data.value === 1)
         {
             window.alert("Domicilio guardado correctamente")
        }
        handleClose()
        setData({
        FkSupplieAd:Number(idSupplie),
        FkadressType:null,
        adressCountry:null,
        adressState:null,
        adressDescription:null,
        aComments:null
        })
        }
        else{window.alert("Todos los campos tienen que estar llenos")}
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
                <Form.Group as={Row}>
                    <Form.Label column='true' sm={3} >Tipo de Domicilio:</Form.Label>
                    <Col sm={5}>
                    <Form.Select onChange={(e)=>{setData({...data,FkadressType:Number(e.target.value)})}}>
                        <option>Selecciona el tipo de domicilio</option>
                        {adType.map((type)=>(<option value={type.idadressType} key={type.idadressType}>{type.aType}</option>))}
                    </Form.Select>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-4">
                    <Form.Label column='true' sm={2}>País:</Form.Label>
                    <Col sm={3}>
                    <Form.Control onChange={(e)=>{setData({...data,adressCountry:e.target.value})}} value={data.adressCountry || ""}/>
                    </Col>
                    <Form.Label column='true' sm={3}>Estado o Provincia:</Form.Label>
                    <Col sm={4}>
                    <Form.Control onChange={(e)=>{setData({...data,adressState:e.target.value})}} value={data.adressState || ""}/>
                    </Col>
                    </Form.Group>
                <Form.Group>
                    <Form.Label>Direccion:</Form.Label>
                    <Form.Control as='textarea' rows={2} value={data.adressDescription || ""} onChange={(e)=>{setData({...data,adressDescription:e.target.value})}}></Form.Control>
                    <Form.Label>Comentarios:</Form.Label>
                    <Form.Control  as='textarea' value={data.aComments || ""} onChange={(e)=>{setData({...data,aComments:e.target.value})}}></Form.Control>
                </Form.Group>
            </Form>    
        </Modal.Body>
                <Modal.Footer>
          <Button variant="primary" onClick={(e)=>{handleClose()}}>
            
            Cerrar
          </Button>
          <Button variant="success" onClick={(e)=>{SendData()}}>Agregar Domicilio</Button>
        </Modal.Footer>
                </Modal>       
    )
}
export default AddAdress;