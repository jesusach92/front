import { useEffect, useState } from 'react'
import {Table,Form,Row, Col, Button, Modal} from 'react-bootstrap'
import axios from 'axios'



const AddAdress = ({show,handleClose,idSupplie}) =>
{
    const AType = 'http://192.168.1.97:3001/TiposDom'
    const [AuthToken, setAuthToken] =useState('')
    const AUT='https://www.universal-tutorial.com/api/getaccesstoken'
    const CTR ='https://www.universal-tutorial.com/api/countries/'
    const STS = 'https://www.universal-tutorial.com/api/states/'
    const SDT= 'http://192.168.1.97:3001/agregar/domicilio'
    const [countrys, setCountrys] = useState([])
    const [country, setCountry] = useState('')
    const [states, setStates]= useState([])
    const [adType, setAdType]=useState([])
    const [data, setData] = useState({
        FkSupplieAd:Number(idSupplie),
        FkadressType:0,
        adressCountry:'Mexico',
        adressState:'',
        adressDescription:'',
        aComments:''

    })
    const getData = async ()=>
    {
        const result= await axios.get(AType)
        setAdType(result.data)
        const auth = await axios.get(AUT,{headers:
            {
                "Accept": "application/json",
                "api-token": "mnAb7B3euzDPUHOQD3f_WJnqv2lioxZTsvAkko_jBK9Pu2zAp3iK509fiID6xXMT8cE",
                "user-email": "jesusach92@gmail.com"
            }})
            if(auth.data.auth_token)
            {
                setAuthToken(auth.data.auth_token)
            }
    }

    const getCountrys = async ()=>{
            const country = await axios.get(CTR,{
                headers:{
                    "Authorization": "Bearer "+AuthToken,
                    "Accept": "application/json"
                }
            })
            setCountrys(country.data)
    }

    const getStates =  async () =>{
    if(country === "0" || country === ""){
    }
    else{
        const states= await axios.get(`${STS}${country}`,{
        headers:{
            "Authorization": "Bearer "+AuthToken,
            "Accept": "application/json"
                }})
                setStates(states.data)
    }
    }

    const SendData= async ()=>
    {
        const result= await axios.post(SDT,data)
        if(result.data.value === 1)
        {
            window.alert("Domicilio guardado correctamente")
        }
    }
    useEffect(()=>
    {
        getData()
    },[])

useEffect(()=>{
    if(AuthToken)
    {getCountrys()}
    
}
,[AuthToken])
useEffect(()=>{
    if(country)
    {
        getStates()
        setData({...data,adressCountry:country})
    }
},[country])

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
                    <Form.Select onChange={(e)=>{setCountry(e.target.value)}} value={country} >
                        <option value={0}>Selecciona el País</option>
                        {countrys.map((country)=>(<option value={country.country_name} key={country.country_name}>{country.country_name}</option>))}
                    </Form.Select>
                    </Col>
                    <Form.Label column='true' sm={3}>Estado o Provincia:</Form.Label>
                    <Col sm={4}>
                    <Form.Select onChange={(e)=>setData({...data,adressState:e.target.value})}>
                        <option value={0}>Selecciona el Estado</option>
                        {states.map((state)=>(<option value={state.state_name} key={state.state_name}>{state.state_name}</option>))}
                    </Form.Select>
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
          <Button variant="primary" onClick={(e)=>{handleClose();console.log(data)}}>
            
            Cerrar
          </Button>
          <Button variant="success" onClick={(e)=>{handleClose();SendData()}}>Agregar Domicilio</Button>
        </Modal.Footer>
                </Modal>       
    )
}
export default AddAdress;