import { Link } from "react-router-dom";
import logo from "../../assets/texinlogo.png";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BarChartIcon from '@material-ui/icons/BarChart';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SettingsIcon from '@material-ui/icons/Settings';


const SideBar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-container">
      <ul>
        <li>
          <Link to="/Inicio">
            <img src={logo} alt="texinlogo" className="image-responsive logo" />
          </Link>
        </li>
        <li className="links">
          <Link to="/Proveedores"><AccountBoxIcon/>Proveedores</Link>
        </li>
        <li className="links">
          
          <Link to="/Agregar/Proveedor"><AddBoxIcon/>
            Agregar Proveedor
          </Link>
        </li>
        <li className="links">
          <Link to="/Productos"><BarChartIcon/>Productos</Link>
        </li>
        <li className="links">
         
          <Link to="/Configuracion"><SettingsIcon/>Configuracion</Link>
        </li>
      </ul>
      </div>
    </aside>
  );
};
export default SideBar;
