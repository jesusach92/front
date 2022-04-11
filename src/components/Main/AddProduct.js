import { useEffect, useState } from 'react'
import {Form,Row, Col, Button, Modal} from 'react-bootstrap'
import axios from 'axios'
import { ADP, TEC } from '../const/Const'


const idProduct = {id:null}
const AddProduct = ({show,handleCloseP, setidProduct})=>
{

   
    const [tech,setTech] = useState([])
    const [data, setData] = useState({
        FkTechnologyPro: null,
        productName: null,
        descriptionProduct:null
    })

    const getTech = async () =>{
        try
        {
         const {data} = await axios.get(TEC)
         setTech(data)
        }
        catch(e){

        }
    }
    useEffect(()=>{
        getTech()
    },[])

    const SendData= async ()=>
    {
        if( !(data.FkTechnologyPro==null ||
            data.productName==null||
            data.descriptionProduct==null))
        {
            const result= await axios.post(ADP,data)
         if(result.data.value === 1)
         {
             window.alert("Producto Agregar Correctamente")
            setidProduct(result.data.insertId)
        }
        handleCloseP()
        setData({
        FkTechnologyPro: null,
        productName: null,
        descriptionProduct:null
        })
        }
        else{window.alert("Todos los campos tienen que estar llenos")}
    }

    return(
        <Modal show={show} onHide={handleCloseP} >
            <Modal.Header>
                <Modal.Title>
                    Agregar Producto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group as={Row}>
                    <Form.Label column='true' sm={4} >Tecnologia del producto:</Form.Label>
                    <Col sm={8}>
                    <Form.Select onChange={(e)=>{setData({...data,FkTechnologyPro:Number(e.target.value)})}}>
                        <option>Selecciona el tipo de Tenologia</option>
                        {tech.map((type)=>(<option value={type.idTechnology} key={type.idTechnology}>{type.nameTechnology}</option>))}
                    </Form.Select>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-4">
                    <Form.Label column='true' sm={4}>Nombre del Producto</Form.Label>
                    <Col sm={8}>
                    <Form.Control onChange={(e)=>{setData({...data,productName:e.target.value})}} value={data.productName || ""}/>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-4">
                    <Form.Label column='true' sm={4}>Descripcion:</Form.Label>
                    <Col sm={8}>
                    <Form.Control as="textarea" rows={2} onChange={(e)=>{setData({...data,descriptionProduct:e.target.value})}} value={data.descriptionProduct|| ""}/>
                    </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
          <Button variant="primary" onClick={(e)=>{handleCloseP()}}>
            Cerrar
          </Button>
          <Button variant="success" onClick={(e)=>{SendData()}}>Agregar Producto</Button>
        </Modal.Footer>
        </Modal>
    )
}
export {idProduct}
export default AddProduct