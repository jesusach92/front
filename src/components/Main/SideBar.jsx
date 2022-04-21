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
          <Link to="/Proveedores"><AccountBoxIcon className="icon_my"/>Proveedores</Link>
        </li>
        <li className="links">
          
          <Link to="/Agregar/Proveedor"><AddBoxIcon className="icon_my"/>
            Agregar Proveedor
          </Link>
        </li>
        <li className="links">
          <Link to="/Productos"><BarChartIcon className="icon_my"/>Productos</Link>
        </li>
        <li className="links">
         
          <Link to="/Configuracion"><SettingsIcon className="icon_my"/>Configuracion</Link>
        </li>
      </ul>
      </div>
    </aside>
  );
};
export default SideBar;
