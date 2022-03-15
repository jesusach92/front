import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {Table} from 'react-bootstrap'
import NavBar from "./NavBar";

const ShowAdressContact = (props) => {
    const {id}= useParams()
    const URI =`http://localhost:3001/proveedores/${id}`
    const [adress, setAdress] = useState([])
    const [supplie, setSupplie] = useState([])
  
    useEffect (()=>{
        getAdress()
    },[])

    const getAdress = async ()=>
    {
        const result= await axios.get(URI);
        setAdress(result.data);
        setSupplie(result.data[0])

    }



    return (
        <div className="container-side p-0">
            <NavBar brand={props.brand}></NavBar>
            <div className="container px-3 pt-3"> 
            <div class="mb-3 row">
            <label for="staticEmail" className="col-sm-2 col-form-label">Proveedor: </label>
            <div class="col-sm-10">
            <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={supplie.supplie_name}/>
            </div>
        </div>
    <div class="mb-3 row">
        <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
        <input type="text" readOnly className="form-control-plaintext" id="inputPassword" value={supplie.id_adress}/>
        </div>
        </div>

            <Table responsive hover>
                <thead>
                    <tr>
                        <th>
                            
                        </th>
                        <th>
                            id
                        </th>
                        <th>
                            País
                        </th>
                        <th>Contactos</th>
                    </tr>
                </thead>
                <tbody>
                    {adress.map((adres)=>(
                        <tr key={adres.id_adress}>
                            <td>{adres.supplie_name}</td>
                            <td>{adres.adress_description}</td>
                            <td>{adres.adress_country}</td>
                            <td>{adres.adress_principal.data == 1 ?"Domicilio Principal":"Surcursal"}</td>
                            <td>
                                <Link to={`/Contactos/Proveedor/${adres.id_adress}`} className="btn btn-outline-primary">Ver</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
            </div>
        </div>
        )
}
export default ShowAdressContact;
