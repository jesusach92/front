import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AUA, DRA } from "../../const/Const";

const initialValues = {
  nameRole: "Invitado",
  FkRole: 4,
  nameUser: "",
  passwordUser: "",
  namePerson: "",
};
const AddUser = ({ setFlag, flag }) => {
  const [role, setRole] = useState([]);
  const [dataUser, setDataUser] = useState(initialValues);

  const getRole = async () => {
    try {
      const { data } = await axios.get(DRA);
      const roleFilter = data.filter(
        (role) => role.idRole !== 999
      );
      setRole(roleFilter);
    } catch (error) {}
  };
  useEffect(() => {
    getRole();
  }, []);

  const sendData = async () => {
    try {
      const Role = role.find(
        (element) => element.nameRole === dataUser.nameRole
      );
    setDataUser({ ...dataUser, FkRole: Role.idRole });
    const { data } = await axios.post(AUA, dataUser);
    alert(""+data.message) 
    setFlag(!flag);      
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <Container component={Paper}>
      <h3>Agregar Usuario</h3>
      <form autoComplete="off">
        <FormControl>
          <InputLabel htmlFor="my-input">Nombre de Usuario</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            onChange={(e) =>
              setDataUser({ ...dataUser, nameUser: e.target.value })
            }
          />
          <FormHelperText id="my-helper-text">
            Sin espacios menor 6 letras
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">Nombre Completo</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            onChange={(e) =>
              setDataUser({ ...dataUser, namePerson: e.target.value })
            }
          />
          <FormHelperText id="my-helper-text">
            Nombre con Apellidos
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Contraseña</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            onChange={(e) =>
              setDataUser({ ...dataUser, passwordUser: e.target.value })
            }
          />
          <FormHelperText id="my-helper-text">
            Contraseña de más de 6 letras
          </FormHelperText>
        </FormControl>
        <TextField
          select
          label="Rol De Usuario"
          value={dataUser.nameRole}
          helperText="Selecciona el Rol de Usuario"
          className="mx-4"
          onChange={(e) => {
            setDataUser({ ...dataUser, nameRole: e.target.value });
          }}
        >
          {role.map((option) => (
            <MenuItem key={option.idRole} value={option.nameRole}>
              {option.nameRole}
            </MenuItem>
          ))}
        </TextField>
        <Button
          className="my-4"
          fullWidth
          variant="contained"
          color="primary"
          onClick={sendData}
        >
          Agregar Usuario
        </Button>
      </form>
    </Container>
  );
};

export default AddUser;
