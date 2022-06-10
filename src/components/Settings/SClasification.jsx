import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { S_CLASIFICATION } from "../const/Const";

import { IconButton } from "@material-ui/core";

import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { UserContext } from "../ContextUser/UserContext";

const initialValues = {
  clasificationName: "",
};
const SClasification = () => {
  const [state] = useContext(UserContext);
  const user = state.user;
  const [show, setShow] = useState(false);
  const [data, setData] = useState(initialValues);
  const [sclasificacion, setsclasificacion] = useState([]);
  const [flag, setFlag] = useState(false);

  const getData = async () => {
    const sclass = await axios.get(S_CLASIFICATION);
    setsclasificacion(sclass.data);
  };

  const deleteData = async (e, id) => {
    await axios.delete(`${S_CLASIFICATION}/${id}`);
    setShow(false);
    setData(initialValues);
    getData();
  };

  const sendData = async () => {
    if (data !== "") {
      const result = await axios.post(S_CLASIFICATION, data);

      if (result.data.value === 1) {
        alert("Clasificacion de Proveedor Guardada Exitosamente");
        setShow(false);
        setData({
          clasificationName: "",
        });
      }
    } else {
      alert("No puedes enviar texto vacio");
    }
  };

  const updateData = async () => {
    if (data !== "") {
      const result = await axios.put(S_CLASIFICATION, data);

      if (result.data.value === 1) {
        alert("Clasificacion de Proveedor Actualizada Exitosamente");
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
      <h5>Clasificacion de Proveedores</h5>
      <Table responsive hover className="mt-2">
        <thead>
          <tr>
            <th>
              Clasificacion de Proveedor{" "}
              {user.FkRole === 1 ||
              user.FkRole === 2 ||
              user.FkRole === 3 ||
              user.FkRole === 999 ? (
                <IconButton color="primary" onClick={(e) => setShow(true)}>
                  <AddBoxIcon fontSize="large"></AddBoxIcon>
                </IconButton>
              ) : (
                <></>
              )}{" "}
            </th>
          </tr>
        </thead>
        {sclasificacion.length === 0 ? (
          <tbody>
            <tr>
              <td>No hay Clasificaciones registradas</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {sclasificacion.map((type) => (
              <tr key={type.idClasification}>
                <td value={type.clasificationName}>{type.clasificationName}</td>
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
                          idClasification: type.idClasification,
                          clasificationName: type.clasificationName,
                        });
                        setFlag(true);
                      }}
                    >
                      <EditIcon></EditIcon>
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
                      onClick={(e) => deleteData(e, type.idClasification)}
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
            <Modal.Title>Actualizar Clasificacion</Modal.Title>
          ) : (
            <Modal.Title>Agregar Clasificacion</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label>Clasificacion de Proveedor</Form.Label>
              <Col>
                <Form.Control
                  placeholder="Nombre de La Clasificacion"
                  value={data.clasificationName}
                  onChange={(e) =>
                    setData({ ...data, clasificationName: e.target.value })
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

export default SClasification;
