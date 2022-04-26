import React, { useContext, useState } from "react";
import NavBar from "./NavBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { AUT } from "../const/Const";
import { UserContext } from "../ContextUser/UserContext";
import { Types } from "../ContextUser/UserReducer";
import { Navigate, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.dark,
    display: "flex",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  nameUser: "",
  passwordUser: "",
};

const Login = ({ brand }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const classes = useStyles();
  const [data, setData] = useState(initialValues);
  const [session, setSession] = useState(state.user);
  const [flag, setFlag] = useState(false);

  const sendData = async () => {
    try {
      const result = await axios.post(AUT, data);
      dispatch({ type: Types.authLogin, payload: result.data.user });
      setFlag(true);
      navigate("/proveedores", { replace: true });
    } catch ({ response }) {
      alert(response.data);
    }
  };
  return session.tokenUser ? (
    <Navigate to={"/Proveedores"} replace></Navigate>
  ) : (
    <div className="flex">
      <SideBar/><div className="container-side p-0">
      <NavBar brand={brand} />
      <div className="container-sm">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Usuario"
                name="nameUser"
                autoComplete="user"
                value={data.nameUser}
                onChange={(e) => setData({ ...data, nameUser: e.target.value })}
                autoFocus
              />
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                name="passwordUser"
                label="Contraseña"
                type="password"
                value={data.passwordUser}
                id="password"
                autoComplete="current-password"
                onChange={(e) =>
                  setData({ ...data, passwordUser: e.target.value })
                }
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={sendData}
              >
                Iniciar Sesión
              </Button>
              {flag === true ? (
                <div>
                  
                  <Navigate to="/proveedores" replace />
                </div>
              ) : (
                <></>
              )}
            </form>
          </div>
        </Container>
      </div>
    </div>
    </div>
    
  );
};

export default Login;
