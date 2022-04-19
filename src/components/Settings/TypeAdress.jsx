import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { AAT, TAD, UAT } from "../const/Const";

const initialValues ={
  aType: ""
}
const TypeAdress = () => {
  const [typesDom, setTypes] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(initialValues);
  const [flag, setFlag] = useState(false)

  const getData = async () => {
    const { data } = await axios.get(TAD);
    setTypes(data);
  };

  useEffect(() => {
    getData();
  }, [show]);

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

  const updateData = async () =>{
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
  }

  return (
    <Col>
      <h5>Tipos de Domicilios</h5>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Tipos de Domicilios</th>
            <th>
              <Button variant="success" onClick={(e) => setShow(true)}>
                Agregar
              </Button>
            </th>
          </tr>
        </thead>
        {typesDom.length === 0 ? (
          <tbody>
            <tr>
              <td>No hay Tipos de Domicilio registradas</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {typesDom.map((type) => (
              <tr key={type.idadressType}>
                <td value={type.aType}>{type.aType}</td>
                <td>
                  <Button
                  onClick={(e) => {
                    setShow(true);
                    setData({
                      ...data,
                      idadressType: type.idadressType,
                      aType: type.aType
                    });
                    setFlag(true);}}
                  >Editar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      <Modal show={show} onHide={(e) => setShow(false)}>
        <Modal.Header closeButton>
        {flag ? (<Modal.Title>Actualizar Tipo de Domicilio</Modal.Title>):(<Modal.Title>Agregar Tipo de Domicilio</Modal.Title>)}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label>Tipo de Domicilio</Form.Label>
              <Col>
                <Form.Control
                  value={data.aType}
                  onChange={(e) => setData({...data, aType: e.target.value })}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => {
              setShow(false);
              setData(initialValues);
              setFlag(false);
            }}>
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
