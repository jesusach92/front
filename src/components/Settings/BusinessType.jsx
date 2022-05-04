import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { ABT, BST, DAT, UBT } from "../const/Const";
import { IconButton } from "@material-ui/core";
import { UserContext } from "../ContextUser/UserContext";

import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const initialValues = {
  bName: "",
  bDescription: "",
};

const AddBusinessType = () => {
  const [state] = useContext(UserContext);
  const user = state.user;
  const [data, setData] = useState(initialValues);
  const [businessType, setBusiness] = useState([]);
  const [show, setShow] = useState(false);
  const [flag, setflag] = useState(false);

  const sendData = async () => {
    if (data.bName !== "" && data.bDescription !== "") {
      const result = await axios.post(ABT, data);
      if (result.data.value === 1) {
        alert("Tipo de Negocio guardado correctamente");
        setShow(false);
        setData(initialValues);
      }
    } else {
      alert("No puedes enviar texto vacio");
    }
  };
  const updateData = async (updateData) => {
    if (data.bName !== "" && data.bDescription !== "") {
      const result = await axios.put(UBT, data);
      if (result.data.value === 1) {
        alert("Tipo de Negocio actualizado correctamente");
        setShow(false);
        setData(initialValues);
        setflag(false);
      }
    } else {
      alert("No puedes enviar texto vacio");
    }
  };
  const deleteData = async (e, id) => {
    const { data } = await axios.delete(`${DAT}/${id}`);
    setShow(false);
    setData(initialValues);
    getData();
  };

  const getData = async () => {
    const result = await axios.get(BST);
    setBusiness(result.data);
  };
  useEffect(() => {
    getData();
  }, [show]);

  return (
    <Col>
      <h5>Tipos de Negocio de proveedores</h5>
      <Table responsive hover>
        <thead>
          <tr>
            <th>
              Tipos de negocio {user.FkRole === 1 ||
                user.FkRole === 2 ||
                user.FkRole ===3 ||
                user.FkRole === 999 ? (
              <IconButton color="primary" onClick={(e) => setShow(true)}>
                <AddBoxIcon fontSize="large"></AddBoxIcon>
              </IconButton>
            ):(<></>)}
            </th>
            
            
          </tr>
        </thead>
        {businessType.length === 0 ? (
          <tbody>
            <tr>
              <td>No hay tipos de Negocio registrados</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {businessType.map((type) => (
              <tr key={type.idBusinessType}>
                <td value={type.bName}>{type.bName}</td>
                <td value={type.bDescription}>{type.bDescription}</td>
                {user.FkRole === 1 ||
                user.FkRole === 2 ||
                user.FkRole === 999 ?(
                <td>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      setShow(true);
                      setData({
                        ...data,
                        bName: type.bName,
                        bDescription: type.bDescription,
                        idBusinessType: type.idBusinessType,
                      });
                      setflag(true);
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
                      onClick={(e) => deleteData(e, type.idBusinessType)}
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
            <Modal.Title>Actualizar Tipo de Negocio</Modal.Title>
          ) : (
            <Modal.Title>Agregar Tipo de Negocio</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label>Tipo de Negocio</Form.Label>
              <Col>
                <Form.Control
                  placeholder="El Tipo de Negocio no debe tener más de 10 letras"
                  value={data.bName}
                  onChange={(e) => setData({ ...data, bName: e.target.value })}
                />
              </Col>
              <Form.Label>Descripcion del Negocio</Form.Label>
              <Col>
                <Form.Control
                  placeholder="Descripcion del Negocio"
                  as="textarea"
                  rows={2}
                  value={data.bDescription}
                  onChange={(e) =>
                    setData({ ...data, bDescription: e.target.value })
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
              setflag(false);
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

export default AddBusinessType;
