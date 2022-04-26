import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ContextUser/UserContext";
import { Types } from "../ContextUser/UserReducer";

const NavBar = ({brand}) => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const { user } = state;
  return (
    <div className="navbar px-5">
      <div className="flex container">
        <h4>{brand}</h4>
        {user.nameUser !== "" ? (
          <span className="Logout" onClick={e=>{dispatch({type: Types.authLogout});navigate('/Login',{replace:true});}}>
              Cerrar Sesión</span>
        ) : (
       <></> )}
      </div>
    </div>
  );
};
export default NavBar;
