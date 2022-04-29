import { Link } from "react-router-dom";
import logo from "../../assets/texinlogo.png";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BarChartIcon from '@material-ui/icons/BarChart';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SettingsIcon from '@material-ui/icons/Settings';
import BuildIcon from '@material-ui/icons/Build';
import { UserContext } from "../ContextUser/UserContext";
import { useContext, useEffect, useState } from "react";

const SideBar = () => {
  const [state, dispatch] = useContext(UserContext)
  const [session, setSession] = useState(state.user)
  
  useEffect(() => {
    if(state.user.tokenUser)
    {
      setSession(state.user)
    }
  },[state])
  return (
    <aside className="sidebar">
      <div className="sidebar-container">
      {session.tokenUser ? (<ul>
        <li>  
          <Link to="/Inicio">
            <img src={logo} alt="texinlogo" className="image-responsive logo" />
          </Link>
        </li>
        {(session.FkRole ===  1 || session.FkRole === 999) ? (
        <li className="links">
          <Link to="/Dashboard"><BuildIcon className="icon_my"/>Administracion</Link>
        </li>):(<></>)}
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
      </ul>):(<ul>
        <li>
          <Link to="/Login">
            <img src={logo} alt="texinlogo" className="image-responsive logo" />
          </Link>
        </li>
        <li className="links">
          <Link to="/Login"><AccountBoxIcon className="icon_my"/>Iniciar Sesion</Link>
        </li>
      </ul>)}
      </div>
    </aside>
  );
};
export default SideBar;
