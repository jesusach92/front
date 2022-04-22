import { useContext } from "react";
import { UserContext } from "../ContextUser/UserContext";
import { Types } from "../ContextUser/UserReducer";

const NavBar = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const { user } = state;

  return (
    <div className="navbar px-5">
      <div className="flex container">
        <h4>{props.brand}</h4>
        {user.nameUser !== "" ? (
          <span onClick={e=>{dispatch({type: Types.authLogout});console.log(user)}}>
              Logout</span>
        ) : (
       <></> )}
      </div>
    </div>
  );
};
export default NavBar;
