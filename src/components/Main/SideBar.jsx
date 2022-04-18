import {Link} from 'react-router-dom';
import logo from '../../assets/texinlogo.png';

const SideBar =()=>{
    return (
        <div className="sidebar">            
    <ul>
      <li>
        <Link to="/Inicio"><img src={logo} alt="texinlogo" className="image-responsive logo"/></Link>
      </li>
      <li className="links">
      
      <Link to="/Proveedores">Proveedores</Link>
      </li>
      <li className="links">
      
      <Link to="/Agregar/Proveedor">Agregar <br/>Proveedor</Link>
      </li>
      <li className="links">
      <Link to="/Productos" >Productos</Link>
      </li>
      <li className="links">
      <Link to="/Configuracion" >Configuracion</Link>
      </li>
    </ul>
        </div>
    )
}
export default SideBar;