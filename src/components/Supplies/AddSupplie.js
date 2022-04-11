import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Tab, Table, Tabs } from 'react-bootstrap'
import { ADS, BST, PBI, PFF, SCT} from '../const/Const'
import AddProduct from '../Main/AddProduct'
import NavBar from '../Main/NavBar'
import AddAdressSup from './Adress/AddAdressSup'
import AsingProductSup from './Products/AsingProductSup'

const initialValuesS ={
	nameSupplie:"",
	FkBusinessType:0, 
	FkClasification:0
}
const initialValuesPS={
	FkSupplieSpy:0, 
	FkProductSpy:0, 
	price:0.0, 
	deliveryTime:"", 
	productLine:"", 
	comments:"", 
	pSampleF:"", 
	pSampleLocation:""
}

const AddSupplie = (props) => {

	const [products, setProducts] = useState([])
	const [product, setProduct] = useState([])
	const [businessType, setBusiness] = useState([])
	const [sclasificacion, setsclasificacion] = useState([])
	const [dataS, setDataS] = useState(initialValuesS)
	const [idSupplie, setIdSup] = useState(0)
	const [key, setKey] = useState('Domicilio')
	const [show, setShow] = useState(false)
	function handleClose () {setShow(false)}
	const [dataPS, setDataPS] = useState(initialValuesPS)
	const [idProduct, setidProduct] = useState(0);

	const getProducts = async ()=>{
		const {data} = await axios.get(PFF)
		setProducts(data)
	}

	const getProduct = async()=>{
		if( idProduct > 0){
		const {data} = await axios.get(`${PBI}${idProduct}`)
		setProduct(data[0])
		setDataPS({...dataPS, FkProductSpy:idProduct, FkSupplieSpy: idSupplie})
	}
	}
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
			setIdSup(data.insertId)
			getProducts()
			}
			else{alert("El Proveedor ya se encuentra registrado")} 
		}
		else{alert("Todos los campos deben estar llenos")}
	}
	useEffect (()=>{
		getData()
		
	},[])

	useEffect(()=>{
		if(idProduct !==0){
		getProduct()}
	},[idProduct])

	return (
	<div className="container-side p-0">
		<NavBar brand= {props.brand}/>
		<div  className="container pt-3">
			<Form className="mt-2">
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
					<Form.Control readOnly={!(idSupplie===0)} plaintext={!(idSupplie===0)} value={dataS.nameSupplie} onChange={e=>setDataS({...dataS,nameSupplie:e.target.value})} />
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
			{idSupplie ===0 ? 
			(<Col>
			<Button variant='primary' onClick={SendDataS}>Guardar</Button>
					</Col>):(<></>)}
					</Form.Group>
			</Form>
			{idSupplie !== 0 ?
			(			
				<Tabs
				activeKey={key}
			    onSelect={(k) => setKey(k)}
				>
					<Tab 
					eventKey="Domicilio" 
					title="Domicilio">
				<AddAdressSup FkSupplieAd={idSupplie}/>           
					</Tab>
					<Tab 
					eventKey="Productos" 
					title="Productos">
						<Form className='container mt-3'>
							<Form.Group as={Row}>
								<Form.Label column='true' sm={3} >Agregar Nuevo Producto</Form.Label>
								<Col sm={2}>								
									<AddProduct show={show} handleCloseP={handleClose} setidProduct={setidProduct}/>
				                	<Button variant="success" sm={2} onClick={e=>setShow(true)} >Agregar Producto</Button>
								</Col>
								<Form.Label column='true' sm={2}>Asignar Producto</Form.Label>
								<Col sm={3}>
                    				<Form.Select onChange={(e)=>{setidProduct(Number(e.target.value))}}>
                        				<option>Selecciona el tipo de domicilio</option>
                        				{products.map((product)=>(<option value={product.idProduct} key={product.idProduct}>{product.productName}</option>))}
                    				</Form.Select>
                    			</Col>
							</Form.Group>
								{idProduct !==0 ? (
									<AsingProductSup idP={idProduct} idSupplie={idSupplie}/>
								):(
									<></>
								)}
							
						</Form>
					</Tab>
				</Tabs>
				

			
			
				):(
			<Table>
				<thead>
					<tr>
						<th>Registrar Datos </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Guardar Proveedor para registrar más Campos</td>
					</tr>
				</tbody>
			</Table>)     
			}
		</div>
	</div>
  			)
}
export default AddSupplie
	 