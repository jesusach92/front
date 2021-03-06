import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { ABT, BST, UBT } from "../const/Const";

const initialValues = {
  bName: "",
  bDescription: "",
};

const AddBusinessType = () => {
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
              <div className="size">Tipos de negocio</div>
            </th>
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
                  <Button
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
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>

      <Modal show={show} onHide={(e) => setShow(false)}>
        <Modal.Header closeButton>
          {flag ? (<Modal.Title>Actualizar Tipo de Negocio</Modal.Title>) :(<Modal.Title>Agregar Tipo de Negocio</Modal.Title>)}
          
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label>Tipo de Negocio</Form.Label>
              <Col>
                <Form.Control
                  placeholder="El Tipo de Negocio no debe tener m??s de 10 letras"
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
