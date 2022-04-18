import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { ABT, BST } from "../const/Const";

const initialValues = {
  bName: "",
  bDescription: "",
};

const AddBusinessType = () => {
  const [data, setData] = useState(initialValues);
  const [businessType, setBusiness] = useState([]);
  const [show, setShow] = useState(false);

  const sendData = async () => {
    console.log(data);
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
            <th>Tipos de negocio</th>
            <th>
              <Button variant="success" onClick={(e) => setShow(true)}>
                Agregar
              </Button>
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
                <td>
                  <Button>Editar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>

      <Modal show={show} onHide={(e) => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Tipo de Negocio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label>Tipo de Negocio</Form.Label>
              <Col>
                <Form.Control
                  placerholder="El Tipo de Negocio no debe tener más de 10 letras"
                  value={data.bName}
                  onChange={(e) => setData({ ...data, bName: e.target.value })}
                />
              </Col>
              <Form.Label>Descripcion del Negocio</Form.Label>
              <Col>
                <Form.Control
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
          <Button variant="primary" onClick={(e) => setShow(false)}>
            Cerrar
          </Button>
          <Button variant="success" onClick={sendData}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default AddBusinessType;
