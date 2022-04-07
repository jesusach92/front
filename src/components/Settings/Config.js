import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { BST, SCT, TAD, TEC } from '../const/Const'
import NavBar from '../NavBar'
import AddBusinessType from './AddBusinessType'
import AddSClasification from './AddSClasification'
import AddTechnologies from './AddTechnologies'
import AddTypeAdress from './AddTypeAdress'

const Config = (props) => {
	const [businessType, setBusiness] = useState([])
	const [sclasificacion, setsclasificacion] = useState([])
	const [technologies, setTech]=useState([])
	const [typesDom , setTypes] =useState([])
	const [showAddAdressT, setShowAddAdressT] = useState(false)
	const [showAddBT, setShowABT] = useState(false)
	const [showAddTech, setShowATCH] = useState(false)
	const [showASC, setShowASC] = useState(false)
	const closeASC =()=>setShowASC(false)
	const showADSC =()=>setShowASC(true)
	const closeAddTech =()=> setShowATCH(false)
	const showATC = () => setShowATCH(true) 	
	const closeABT =()=> setShowABT(false)
	const showABT =()=>setShowABT(true)
	const handleClose = ()=> setShowAddAdressT(false)
	const showAdd =()=> setShowAddAdressT(true)


	const getData = async ()=>{
	const tech = await axios.get(TEC)
	const business = await axios.get(BST)
	const sclass = await axios.get(SCT)
	const dom= await axios.get(TAD)	
	setBusiness(business.data)
	setsclasificacion(sclass.data)
	setTech(tech.data)
	setTypes(dom.data)
	}
	
	useEffect(() => {
	getData()
	},[])
	return (
		<div className="container-side p-0">
				<NavBar brand={props.brand}/>
				<div className="container border mt-5 p-3">
				<h5>Este apartado de configuracion es para agregar campos importantes de uso, tipos de negocio, clasificacion de proveedores, tipos de domicilio, entre otros.</h5>
				</div>
				<div className="container mt-5">
						<Row>
				<h5>Proveedores</h5>
								<Col>
										
										<Table responsive hover>
											<thead>
													<tr>
														<AddBusinessType show={showAddBT} handleClose={closeABT}/>
														<th>Tipos de negocio</th>
														<th><Button variant='success' onClick={showABT}>Agregar</Button></th>
													</tr>
											</thead>
											{businessType.length===0 ? (
												<tbody>
													<tr>
													 <td>No hay tipos de Negocio registrados
													 </td>
													</tr>
												</tbody>
											):(
												<tbody>
													{businessType.map((type)=>(
													 <tr key={type.idBusinessType}>
													 <td  value={type.bName} >{type.bName}</td> 
													 <td value={type.bDescription}>{type.bDescription}</td>
													<td><Button>Editar</Button></td>
							 </tr>
													))}                       
					</tbody>
											)
											}
										</Table>
								</Col>
								<Col>
										<Table responsive hover>
											<thead>
											<tr>
											<AddSClasification show={showASC} handleClose={closeASC}/>
											<th>Clasificacion de Proveedor</th>
							<th><Button variant='success' onClick={(e)=> setShowASC(true)}>Agregar</Button></th>
													</tr>
											</thead>
											{sclasificacion.length===0 ? (
												<tbody>
													<tr>
													 <td>No hay Clasificaciones registradas</td>
													</tr>
												</tbody>
											):(
												<tbody>
													{sclasificacion.map((type)=>(
													<tr key={type.idClasification}>
													<td  value={type.clasificationName} >{type.clasificationName}</td> 
													<td><Button>Editar</Button></td>
													</tr>
													))}                       
					</tbody>
											)
											}
										</Table>
								</Col>
						</Row>
			<Row className='mt-3'>
				<Col>
				<h5>Productos</h5>
				<Table responsive hover>
					<thead>
						<tr>
							<AddTechnologies show={showAddTech} handleClose={closeAddTech}/>
							<th>Clasificacion de Tecnologias</th>
							<th><Button variant='success' onClick={showATC}>Agregar</Button></th>
						</tr>
					</thead>
					{technologies.length === 0  ? (
					<tbody>
						<tr>
							<th>No hay Tecnologias registradas</th>
						</tr>
					</tbody>):
					(<tbody>
					{technologies.map((type)=>(
						<tr key={type.idTechnology}>
							<td value={type.nameTechnology} >{type.nameTechnology}</td> 
							<td><Button>Editar</Button></td>
						</tr>))}                       
					</tbody>)
					}
				</Table>
				</Col>
				<Col>
				<h5>Domicilios</h5>
				<Table responsive hover>
											<thead>
													<tr>
													<AddTypeAdress show={showAddAdressT} handleClose={handleClose}></AddTypeAdress>
														<th>Tipos de Domicilios</th>
							<th><Button variant='success'  onClick={showAdd}>Agregar</Button></th>
													</tr>
											</thead>
											{typesDom.length === 0  ? (
												<tbody>
													<tr>
													 <th>No hay Tipos de Domicilio registradas</th>
													</tr>
												</tbody>
											):(
												<tbody>
													{typesDom.map((type)=>(
													<tr key={type.idadressType}>
													<td value={type.aType} >{type.aType}</td> 
							 						<td><Button>Editar</Button></td>
							 						</tr>
													))}                       
					</tbody>
											)
											}
										</Table>
				</Col>
			</Row>
				</div>
		</div>
	)
}

export default Config

