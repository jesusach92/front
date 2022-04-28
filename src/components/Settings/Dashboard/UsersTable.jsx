import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { DDA, DUA } from "../../const/Const";
import { Button } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import { UserContext } from "../../ContextUser/UserContext";

const useStyles = makeStyles({
  table: {
    maxWidth: 400,
  },
});

const UsersTable = ({ flag, setFlag }) => {
  const [state, dispatch] = useContext(UserContext);
  const user = state.user;
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const deleteUsers = async (idUsers) => {
    try {
      const { data } = await axios.delete(`${DDA}/${idUsers}`);
      if (data.value === 1) {
        setFlag(!flag);
      } else {
        alert("No se pudo eliminar al Usuario");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createData = (idUsers, nameUser, namePerson, nameRole, privileges) => {
    const deleteUser = (
      <Button onClick={(e) => deleteUsers(idUsers)}>
        <DeleteIcon />
      </Button>
    );
    return { idUsers, nameUser, namePerson, nameRole, privileges, deleteUser };
  };
  const getUsers = async () => {
    try {
      const { data } = await axios.get(DUA);
      const usersfilter = data.filter(
        (use) => use.idUsers !== user.id && use.idRole !== 999
      );
      //Pendiente Eliminar este Proceso y hacerlo desde el servidor.
      setUsers(usersfilter);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUsers();
  }, [flag]);

  const rows = users.map((user) =>
    createData(
      user.idUsers,
      user.nameUser,
      user.namePerson,
      user.nameRole,
      user.privileges
    )
  );
  return (
    <TableContainer className="fixed-my contenedor" component={Paper}>
      <h3 className="px-3">Usuarios</h3>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id Usuario</TableCell>
            <TableCell align="right">Nombre de Usuario</TableCell>
            <TableCell align="right">Nombre de Persona</TableCell>
            <TableCell align="right">Rol de Usuario</TableCell>
            <TableCell align="right">Privilegios</TableCell>
            <TableCell align="center">Borrar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody fixed={true}>
          {rows.map((row) => (
            <TableRow key={row.idUsers} hover={true}>
              <TableCell align="center">{row.idUsers}</TableCell>
              <TableCell align="center">{row.nameUser}</TableCell>
              <TableCell align="right">{row.namePerson}</TableCell>
              <TableCell align="center">{row.nameRole}</TableCell>
              <TableCell align="right">{row.privileges}</TableCell>
              <TableCell align="right">{row.deleteUser}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default UsersTable;
