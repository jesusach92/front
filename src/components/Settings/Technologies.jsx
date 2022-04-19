import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { ATH, TEC, UTH } from "../const/Const";

const initialValues = {
  nameTechnology: "",
};
const Technologies = () => {
  const [technologies, setTech] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(initialValues);
  const [flag, setFlag] = useState(false);

  const getData = async () => {
    const { data } = await axios.get(TEC);
    setTech(data);
  };

  const sendData = async () => {
    if (data !== "") {
      const result = await axios.post(ATH, data);
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
    console.log(data)
    if (data !== "") {
      const result = await axios.put(UTH, data);
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
            <th>Clasificacion de Tecnologias</th>
            <th>
              <Button variant="success" onClick={(e) => setShow(true)}>
                Agregar
              </Button>
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
                <td>
                  <Button
                    onClick={(e) => {
                      setShow(true);
                      setData({
                        ...data,
                          idTechnology: type.idTechnology,
                        nameTechnology: type.nameTechnology
                      });
                      setFlag(true);
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
          {flag ? (<Modal.Title>Actualizar Tecnologia</Modal.Title>):(<Modal.Title>Agregar Tecnologia</Modal.Title>)}
          
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label>Tecnologia</Form.Label>
              <Col>
                <Form.Control
                  value={data.nameTechnology}
                  onChange={(e) => setData({ ...data, nameTechnology: e.target.value })}
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
