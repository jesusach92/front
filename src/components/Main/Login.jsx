import React, { useContext, useState } from 'react'
import NavBar from './NavBar'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AUT } from '../const/Const';
import { Alert } from '@material-ui/lab';
import { UserContext } from '../ContextUser/UserContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.dark,
    display: 'flex',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  nameUser:"", 
  passwordUser:""
}

const Login = ({brand}) => {
  const[state, dispatch] = useContext(UserContext)
  const classes = useStyles();
  const [data, setData] = useState(initialValues)
  const [session, setSession] = useState(state.user)
  const [flag, setFlag] = useState(false)

  const sendData = async ()=>{
   try {
    const result = await axios.post(AUT,data)
    setSession({data: result.data.user})
    setFlag(true)
   } catch ({response}) {
     alert(response.data)
    
   }
  }
  return (
    session.tokenUser !== "" ? (<Navigate to={'/Proveedores'} replace></Navigate>):
    <div className="container-side p-0">
         <NavBar brand={brand}/>
         <div className="container-sm">
<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesi??n
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
            onChange={e=>setData({...data, nameUser:e.target.value})}
            autoFocus
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="passwordUser"
            label="Contrase??a"
            type="password"
            value={data.passwordUser}
            id="password"
            autoComplete="current-password"
            onChange={e=>setData({...data, passwordUser : e.target.value})}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuerdame"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={sendData}
          >
            Iniciar Sesi??n
          </Button>
          {flag === true ? (<div>{alert("Bienvenido")}<Navigate to="/proveedores" replace/></div>):<></>}
          <Grid item xs>
              <Link to="/Register" variant="body2">
                Registrarse
              </Link>
            </Grid>
        </form>
      </div>
    </Container>
         </div>
    </div>
  )
}

export default Login