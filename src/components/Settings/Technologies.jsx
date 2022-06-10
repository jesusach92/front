import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { TECHNOLOGY } from "../const/Const";

import { IconButton } from "@material-ui/core";

import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { UserContext } from "../ContextUser/UserContext";

const initialValues = {
  nameTechnology: "",
};
const Technologies = () => {
  const [state] = useContext(UserContext);
  const user = state.user;
  const [technologies, setTech] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(initialValues);
  const [flag, setFlag] = useState(false);

  const getData = async () => {
    const { data } = await axios.get(TECHNOLOGY);
    setTech(data);
  };

  const deleteData = async (e, id) => {
    await axios.delete(`${TECHNOLOGY}/${id}`);
    setShow(false);
    setData(initialValues);
    getData();
  };

  const sendData = async () => {
    if (data !== "") {
      const result = await axios.post(TECHNOLOGY, data);
      if (result.data.value === 1) {
        alert("Tenologia guardada correctamente");
        setShow(false);
        setData(initialValues);
      }
    } else {
      alert("No puedes enviar texto vacio");
    }
  };

  const updateData = async () => {
    console.log(data);
    if (data !== "") {
      const result = await axios.put(TECHNOLOGY, data);
      if (result.data.value === 1) {
        alert("Tecnologia  Actualizada correctamente");
        setShow(false);
        setData(initialValues);
        setFlag(false);
      }
    } else {
      alert("No puedes enviar texto vacio");
    }
  };

  useEffect(() => {
    getData();
  }, [show]);

  return (
    <Col>
      <h5>Tecnologias de Productos</h5>
      <Table responsive hover>
        <thead>
          <tr>
            <th>
              Clasificacion de Tecnologias{" "}
              {user.FkRole === 1 ||
              user.FkRole === 2 ||
              user.FkRole === 3 ||
              user.FkRole === 999 ? (
                <IconButton color="primary" onClick={(e) => setShow(true)}>
                  <AddBoxIcon fontSize="large" />
                </IconButton>
              ) : (
                <></>
              )}
            </th>
          </tr>
        </thead>
        {technologies.length === 0 ? (
          <tbody>
            <tr>
              <td>No hay Tecnologias registradas</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {technologies.map((type) => (
              <tr key={type.idTechnology}>
                <td value={type.nameTechnology}>{type.nameTechnology}</td>
                {user.FkRole === 1 ||
                user.FkRole === 2 ||
                user.FkRole === 999 ? (
                  <td>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        setShow(true);
                        setData({
                          ...data,
                          idTechnology: type.idTechnology,
                          nameTechnology: type.nameTechnology,
                        });
                        setFlag(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </td>
                ) : (
                  <></>
                )}

                {user.FkRole === 1 || user.FkRole === 999 ? (
                  <td>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={(e) => deleteData(e, type.idTechnology)}
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
            <Modal.Title>Actualizar Tecnologia</Modal.Title>
          ) : (
            <Modal.Title>Agregar Tecnologia</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label>Tecnologia</Form.Label>
              <Col>
                <Form.Control
                  value={data.nameTechnology}
                  onChange={(e) =>
                    setData({ ...data, nameTechnology: e.target.value })
                  }
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

export default Technologies;
