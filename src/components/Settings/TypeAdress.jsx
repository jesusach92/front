import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { AAT, DTD, TAD, UAT } from "../const/Const";

import { IconButton } from "@material-ui/core";

import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { UserContext } from "../ContextUser/UserContext";

const initialValues = {
  aType: "",
};
const TypeAdress = () => {
  const [state, dispatch] = useContext(UserContext);
  const user = state.user;
  const [typesDom, setTypes] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(initialValues);
  const [flag, setFlag] = useState(false);

  const getData = async () => {
    const { data } = await axios.get(TAD);
    setTypes(data);
  };

  useEffect(() => {
    getData();
  }, [show]);

  const deleteData = async (e, id) => {
    const { data } = await axios.delete(`${DTD}/${id}`);
    setShow(false);
    setData(initialValues);
    getData();
  };

  const sendData = async () => {
    if (data.aType !== "") {
      const result = await axios.post(AAT, data);
      if (result.data.value === 1) {
        alert("Tipo de Domicilio guardado correctamente");
        setShow(false);
        setData({
          aType: "",
        });
      }
    } else {
      alert("No puedes enviar texto vacio");
    }
  };

  const updateData = async () => {
    if (data.aType !== "") {
      const result = await axios.put(UAT, data);
      if (result.data.value === 1) {
        alert("Tipo de Domicilio actualizado correctamente");
        setShow(false);
        setData(initialValues);
        setFlag(false);
      }
    } else {
      alert("No puedes enviar texto vacio");
    }
  };

  return (
    <Col>
      <h5>Tipos de Domicilios</h5>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Tipos de Domicilios
            {user.FkRole === 1 ||
                user.FkRole === 2 ||
                user.FkRole ===3 ||
                user.FkRole === 999 ? (
              <IconButton color="primary" onClick={(e) => setShow(true)}>
                <AddBoxIcon fontSize="large" />
              </IconButton>
            ):(<></>)}
            </th>
           
          </tr>
        </thead>
        {typesDom.length === 0 ? (
          <tbody>
            <tr>
              <td>No hay Tipos de Domicilio registrados</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {typesDom.map((type) => (
              <tr key={type.idadressType}>
                <td value={type.aType}>{type.aType}</td>
                {user.FkRole === 1 ||
                user.FkRole === 2 ||
                user.FkRole === 999 ?(<td>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      setShow(true);
                      setData({
                        ...data,
                        idadressType: type.idadressType,
                        aType: type.aType,
                      });
                      setFlag(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </td>):(<></>)}
                
                {user.FkRole === 1 ||
                user.FkRole === 999 ? (
                  <td>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={(e) => deleteData(e, type.idadressType)}
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      <Modal show={show} onHide={(e) => setShow(false)}>
        <Modal.Header closeButton>
          {flag ? (
            <Modal.Title>Actualizar Tipo de Domicilio</Modal.Title>
          ) : (
            <Modal.Title>Agregar Tipo de Domicilio</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label>Tipo de Domicilio</Form.Label>
              <Col>
                <Form.Control
                  value={data.aType}
                  onChange={(e) => setData({ ...data, aType: e.target.value })}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(e) => {
              setShow(false);
              setData(initialValues);
              setFlag(false);
            }}
          >
            Cerrar
          </Button>
          {flag ? (
            <Button variant="success" onClick={updateData}>
              Actualizar
            </Button>
          ) : (
            <Button variant="success" onClick={sendData}>
              Agregar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default TypeAdress;
