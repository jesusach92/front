import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { ADS, BST, SCT} from '../const/Const'
import NavBar from '../NavBar'
import AddAdressSup from './AddAdressSup'

const initialValuesS ={
    nameSupplie:"",
    FkBusinessType:0, 
    FkClasification:0
}


const AddSupplie = (props) => {

    const [businessType, setBusiness] = useState([])
    const [sclasificacion, setsclasificacion] = useState([])
    const [dataS, setDataS] = useState(initialValuesS)
    const [idSupplie, setIdSup] = useState({id:0})
   
    const getData = async ()=>
    {
        const business = await axios.get(BST)
        const sclas = await axios.get(SCT)
        setsclasificacion(sclas.data)
        setBusiness(business.data)
    }
    const SendDataS= async ()=>{
        if(dataS.FkBusinessType>0 && dataS.FkBusinessType >0 && dataS.nameSupplie !== "")
        {
            const {data} = await axios.post(ADS,dataS)
            if(data.value)
            {
            alert("Proveedor Agregardo Correctamente")
            setIdSup({id:data.insertId})
            }
            else{alert("El Proveedor ya se encuentra registrado")} 
        }
        else{alert("Todos los campos deben estar llenos")}
    }
    useEffect (()=>{
        getData()
    },[])

    return (
    <div className="container-side p-0">
        <NavBar brand= {props.brand}/>
        <div  className="container pt-3">
            <Form className="mt-3">
                <Form.Group as={Row}>
                <Form.Label column='true' sm={3}>
                    <h5>Registro de Proveedor</h5>
                </Form.Label>    
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column='true' sm={3}>
                    Nombre de Proveedor:
                    </Form.Label>
                    <Col sm={3}>
                    <Form.Control value={dataS.nameSupplie} onChange={e=>setDataS({...dataS,nameSupplie:e.target.value})} />
                    </Col>
                    <Form.Label column='true' sm={2}>
                    Tipo de Negocio:
                    </Form.Label>
                    <Col sm={4}>
                    <Form.Select onChange={e=>setDataS({...dataS,FkBusinessType:Number(e.target.value)})}>
                        <option>Selecciona un tipo de Negocio</option>
                        {businessType.map((type) => (
                        <option key={type.idBusinessType} value={type.idBusinessType}>{type.bName}</option> 
                        ))}
                    </Form.Select>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mt-4'>
                    <Form.Label column='true' sm={3}>
                    Clasificacion:
                    </Form.Label>
                    <Col sm={3}>    
                    <Form.Select onChange={e=>setDataS({...dataS,FkClasification:Number(e.target.value)})}>
                        <option>Selecciona la Clasificacion</option>
                        {sclasificacion.map((type)=>(
                            <option key={type.idClasification} value={type.idClasification}>{type.clasificationName}</option>
                        ))}
                    </Form.Select>
                    </Col>
                    <Col>
                    <Button variant='primary' onClick={SendDataS}>Guardar</Button>
                    </Col>
                    </Form.Group>

            </Form>
            {idSupplie.id !== 0 ?
            (
                <AddAdressSup FkSupplieAd={idSupplie.id}/>           
            ):(
            <Table>
            	<thead>
                	<tr>
                    	<th>Registrar Domicilio</th>
                    </tr>
                </thead>
				<tbody>
					<tr>
						<td>Guardar proveedor para poder Registrar Domicilio</td>
					</tr>
				</tbody>
            </Table>)     
            }
		</div>
	</div>
  			)
}
export default AddSupplie
     