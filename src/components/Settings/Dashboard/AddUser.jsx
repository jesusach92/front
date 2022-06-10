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
import { USERS } from "../../const/Const";

const initialValues = {
  nameRole: "",
  FkRole: 4,
  nameUser: "",
  passwordUser: "",
  namePerson: "",
};
const AddUser = ({ setFlag, flag, user }) => {
  const [role, setRole] = useState([]);
  const [dataUser, setDataUser] = useState(initialValues);
  const [flagUse, setFlagUse] = useState(false);

  const getRole = async () => {
    try {
      const { data } = await axios.get(USERS);
      const roleFilter = data.filter((role) => role.idRole !== 999);
      setRole(roleFilter);
    } catch (error) {}
  };
  useEffect(() => {
    if (user) {
      setFlagUse(true);
      setDataUser(user);
    }
  }, [user]);

  useEffect(() => {
    getRole();
  }, []);
  const searchFkRole = (e) => {
    const Role = role.find((element) => element.nameRole === e.target.value);
    setDataUser({ ...dataUser, FkRole: Role.idRole, nameRole: e.target.value });
  };
  const empty = () => {
    if (
      dataUser.nameRole !== "" &&
      dataUser.nameUser !== "" &&
      dataUser.passwordUser !== null &&
      dataUser.passwordUser !== "" &&
      dataUser.hasOwnProperty("passwordUser") &&
      dataUser.namePerson !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  const UpdateData = async () => {
    if (empty()) {
      try {
        const { data } = await axios.put(USERS, dataUser);
        if (data.value === 1) {
          setDataUser(initialValues);
          setFlag(!flag);
          setFlagUse(false);
        } else {
          alert("No se pudo Actualizar el Usuario");
        }
        setDataUser(initialValues);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Todos los campos deben estar llenos");
    }
  };

  const sendData = async () => {
    if (empty()) {
      try {
        const { data } = await axios.post(USERS, dataUser);
        alert("" + data.message);
        setDataUser(initialValues);
        setFlag(!flag);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Todos los campos deben estar llenos");
    }
  };

  return (
    <Container component={Paper}>
      <h3>Agregar Usuario</h3>
      <form autoComplete="off">
        <FormControl focused={flagUse ? true : false}>
          <InputLabel htmlFor="my-input">Nombre de Usuario</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            value={dataUser.nameUser}
            onChange={(e) =>
              setDataUser({ ...dataUser, nameUser: e.target.value })
            }
          />
          <FormHelperText id="my-helper-text">
            Sin espacios menor 6 letras
          </FormHelperText>
        </FormControl>
        <FormControl focused={flagUse ? true : false} fullWidth>
          <InputLabel htmlFor="my-input">Nombre Completo</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            value={dataUser.namePerson}
            onChange={(e) =>
              setDataUser({ ...dataUser, namePerson: e.target.value })
            }
          />
          <FormHelperText id="my-helper-text">
            Nombre con Apellidos
          </FormHelperText>
        </FormControl>
        <FormControl focused={flagUse ? true : false}>
          <InputLabel htmlFor="my-input">Contraseña</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            value={dataUser.passwordUser || ""}
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
            searchFkRole(e);
          }}
        >
          {role.map((option) => (
            <MenuItem key={option.idRole} value={option.nameRole}>
              {option.nameRole}
            </MenuItem>
          ))}
        </TextField>
        {flagUse ? (
          <>
            <Button
              className="my-4"
              variant="contained"
              color="primary"
              onClick={(e) => {
                UpdateData();
              }}
            >
              Actualizar Usuario
            </Button>
            <Button
              className="my-4 mx-4"
              variant="contained"
              color="secondary"
              onClick={(e) => {
                setFlagUse(false);
                setDataUser(initialValues);
              }}
            >
              Nuevo Usuario
            </Button>
          </>
        ) : (
          <Button
            className="my-4"
            fullWidth
            variant="contained"
            color="primary"
            onClick={sendData}
          >
            Agregar Usuario
          </Button>
        )}
      </form>
    </Container>
  );
};

export default AddUser;
