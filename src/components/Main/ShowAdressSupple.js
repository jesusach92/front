import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {Table,Form,Row, Col, Button, Modal} from 'react-bootstrap'
import NavBar from "./NavBar";
import AddAdress from "./AddAdress";

const ShowAdressSupplie = (props) => {
    const {id}= useParams()
    const URI =`http://localhost:3001/proveedor/${id}`
    const DOM =`http://localhost:3001/proveedor/domicilios/${id}`
    const CON =`http://localhost:3001/proveedor/domicilio/contactos`
    const DEL ='http://localhost:3001/Borrar/Domicilio/'
    const [supplie, setSupplie] = useState([])
    const [adress, setAdress] = useState([])
    const [contacts, setContacts] = useState([])
    const [show, setShow] = useState(false)
    const handleShow = (e,idAdress) => {
        setShow(true)
        getContacts(idAdress)
    }
    const [ModalAdress, setModalAdress] = useState(false)

    const showAdd = ()=>setModalAdress(true) 
    const HideAdd = ()=>{setModalAdress(false)
    getData()
    }
    useEffect (()=>{
        getData()
    },[])

    const getData = async ()=>
    {
        try{
        const tresult= await axios.get(URI)
        const tadress=await axios.get(DOM)
        let [dateinital]= tresult.data[0].sDateInitial.split('T')
        let [dateUpdate] = tresult.data[0].sDateUpdate.split('T')
        tresult.data[0].sDateInitial=dateinital
        tresult.data[0].sDateUpdate=dateUpdate
        setSupplie(tresult.data[0])
        setAdress(tadress.data)
    }
        catch (e){
            console.log(e)
        }
    }
    const getContacts= async (idAdress)=>{
        const result = await axios.get(`${CON}/${idAdress}`)
        setContacts(result.data)
    }

    const deleteAd= async(e,idad)=>
    {
        const result=await axios.delete(`${DEL}${idad}`)
        console.log(result)
    }
//Componente para Renderizado condicional
    return (
        <div className="container-side p-0">
            <NavBar brand={props.brand}></NavBar>
            <div className="container px-3 pt-3 "> 
            <Form>
                <Form.Group as={Row} className="mb-3 " >
                <Form.Label column sm={2}>
                    Nombre de Proveedor:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control as="textarea" rows={2} plaintext readOnly value={supplie.nameSupplie ||  ''}  />
                </Col>
                <Form.Label column sm={2}>
                    Tipo de Proveedor:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="text" plaintext readOnly value={supplie.bName ||  ''}  />
                </Col>
                <Form.Label column sm={2}>
                    Descripcion de Negocio:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control as="textarea" rows={2} plaintext readOnly value={supplie.bDescription ||  ''}  />
                </Col>
                <Form.Label column sm={2}>
                    Clasificacion:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control plaintext readOnly value={supplie.clasificationName ||  ''}  />
                </Col>
                <Form.Label column sm={2}>
                    Fecha de Registro:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control plaintext readOnly value={supplie.sDateInitial ||  ''}  />
                </Col>
                <Form.Label column sm={2}>
                    Fecha de Ultima actualizacion:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control plaintext readOnly value={supplie.sDateUpdate ||  ''}  />
                </Col>

                </Form.Group>
                <Form.Group>
                <AddAdress show={ModalAdress} handleClose={HideAdd} idSupplie={id}  />
                <Button onClick={showAdd} className="btn btn-warning">Agregar Domicilio</Button>
                <Link to= {`/Proveedores/Productos/${supplie.idSupplie}`} className="btn btn-success mx-3">Mostrar Productos</Link>
                </Form.Group>
            </Form>
            {adress.length === 0?(
                 <Form className="mt-5">
                 <Form.Label>El Proveedor no cuenta con domicilios registrados
                 </Form.Label>
             </Form>
            ):(           <Table responsive hover>
                <thead>
                    <tr>
                        <th>Domicilio de contacto</th>
                        <th>Tipo de Domicilio</th>
                        <th>País</th>
                        <th>Estado</th>
                        <th>Direccion</th>
                        <th>Comentarios</th>
                        <th>Contactos</th>
                        <th>Agregar contacto</th>
                        <th>Borrar Domicilio</th>
                    </tr>
                </thead>
                <tbody>
                    {adress.map((adres)=>(
                        <tr key={adres.idAdress}>
                            <td>{adres.adressPrincipal.data[0]===1?"Domicilio de principal contacto":"Domicilio Secundario"}</td>
                            <td>{adres.aType}</td>
                            <td>{adres.adressCountry}</td>
                            <td>{adres.adressState}</td>
                            <td>{adres.adressDescription}</td>
                            <td>{adres.aComments}</td>
                            <td>
                            <Button onClick={(e)=>handleShow(e,adres.idAdress)} className="btn btn-warning">Mostrar</Button>

                            
                                {/* <Link to={`/Contactos/Proveedor/${adres.id_adress}`} className="btn btn-outline-primary">Ver</Link> */}
                            </td>
                            <td><Button variant="warning">Agregar</Button></td>
                            <td><Button variant="danger" onClick={(e)=>{deleteAd(e,adres.idAdress);getData()}}>Borrar</Button></td>
                        </tr>
                    ))}
                </tbody>

            </Table>)}
 
            <Modal show={show} size="lg" onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
            <Modal.Title>Contactos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {contacts.length===0?(
              <Form>
                  <Form.Label>El domicilio no tiene contactos registrados</Form.Label>
              </Form>
            ):<Table responsive hover>
                <thead>
                    <tr>
                        <th>Nombre del Contacto:</th>
                        <th>Estado de Contacto</th>
                        <th>Puesto</th>
                        <th>Numero de Oficina</th>
                        <th>Numero Celular</th>
                        <th>Comentarios</th>
                        <th>Editar contacto</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact)=>(
                        <tr key={contact.idContact}>
                            <td>{contact.nameContact}</td>
                            <td>{contact.contactPrincipal.data[0]===1?"Contacto Principal":"Contacto Secundario"}</td>
                            <td>{contact.workposition}</td>
                            <td>{contact.officeNumber}</td>
                            <td>{contact.cellphoneNumber}</td>
                            <td>{contact.comments}</td>
                            <td>
                            <Button className="btn btn-warning">Editar</Button>
                                {/* <Link to={`/Contactos/Proveedor/${adres.id_adress}`} className="btn btn-outline-primary">Ver</Link> */}
                            </td>
                        </tr>
                    
                    ))
                }
                </tbody>
            </Table>}    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
			</Modal>  
            </div>
        </div>
        )
}
export default ShowAdressSupplie;
