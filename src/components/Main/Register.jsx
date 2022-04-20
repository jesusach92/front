import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavBar from "./NavBar";
import { useState } from "react";
import axios from "axios";
import { AUS } from "../const/Const";

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
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  nameUser: "",
  passwordUser: "",
  namePerson: "",
};

const initialError = {
  flag: false,
  message: "Error",
};
const Register = ({ brand }) => {
  const [errorPass, setErrorPass] = useState(initialError);
  const [errorUser, setErrorUser] = useState(initialError);
  const [data, setData] = useState(initialValues);
  const classes = useStyles();

 
  const handlePass = (e) => {
    const { name, value } = e.target;
    for (let i = 0; i < value.length; i++) {
      let letra = value[i];
      if (letra === " ") {
        setErrorPass({
          flag: true,
          message: "La contraseña no puede contener espacios",
        });

        return;
      }
    }
    if (value.length < 6) {
      setErrorPass({
        flag: true,
        message: "La contraseña debe ser minimo 6 caracteres",
      });
      setData({ ...data, [name]: value });
    } else {
      setErrorPass(false);
      setData({ ...data, [name]: value });
    }
  };

  const handleUser = (e) => {
    const { name, value } = e.target;
    for (let i = 0; i < value.length; i++) {
      let letra = value[i];
      if (letra === " ") {
        setErrorUser({
          flag: true,
          message: "El nombre de Usuario no puede contener espacios",
        });

        return;
      }
    }
    if (value.length < 8) {
      setErrorUser({
        flag: true,
        message: "El Nombre de Usuario debe ser minimo 8 caracteres",
      });
      setData({ ...data, [name]: value });
    } else {
      setErrorUser(false);
      setData({ ...data, [name]: value });
    }
  };
  const sendData = async () => {
    if (
      data.nameUser !== "" &&
      data.passwordUser !== "" &&
      data.namePerson !== ""
    ) {
      const result = await axios.post(AUS, data);
      
      if (result.data.value === 2) {
        alert("El Nombre de Usuario ya esta registrado");
      }
      else if(result.data.value===1){
        alert("Usuario Registrado con Exito")
        setData(initialValues)
      }
    } else {
      alert("Todos los campos deben estar llenos");
    }
  };

  return (
    <div className="container-side p-0">
      <NavBar brand={brand} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar Usuario
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="namePerson"
                  variant="filled"
                  required
                  fullWidth
                  id="namePerson"
                  label="Nombre Completo"
                  value={data.namePerson}
                  autoFocus
                  onChange={(e) => {
                    setData({ ...data, namePerson: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorUser.flag}
                  variant="filled"
                  required
                  fullWidth
                  id="nameUser"
                  label="Nombre de Usuario"
                  name="nameUser"
                  value={data.nameUser}
                  helperText={errorUser.flag ? errorUser.message : ""}
                  onChange={(e) => {
                    handleUser(e);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorPass.flag}
                  variant="filled"
                  required
                  fullWidth
                  name="passwordUser"
                  label="Contraseña"
                  type="password"
                  id="password"
                  value={data.passwordUser}
                  autoComplete="current-password"
                  helperText={errorPass.flag ? errorPass.message : ""}
                  onChange={(e) => handlePass(e)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={sendData}
            >
              Registrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Ya tienes un Usuario Inicia Sesión
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Register;
