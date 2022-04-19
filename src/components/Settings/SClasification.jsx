import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { ACS, SCT, UCS } from "../const/Const";

const initialValues = {
  clasificationName: ""
}
const SClasification = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(initialValues);
  const [sclasificacion, setsclasificacion] = useState([]);
  const [flag, setFlag] = useState(false)

  const getData = async () => {
    const sclass = await axios.get(SCT);
    setsclasificacion(sclass.data);
  };

  const sendData = async () => {
    if (data !== "") {
     
      const result = await axios.post(ACS, data);
     
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

  const updateData = async () =>{
    if (data !== "") {
      
      const result = await axios.put(UCS, data);
     
      if (result.data.value === 1) {
        alert("Clasificacion de Proveedor Actualizada Exitosamente");
        setShow(false);
        setData(initialValues);
        setFlag(false);
      }
    } else {
      alert("No puedes enviar texto vacio");
    }
  }

  useEffect(() => {
    getData();
  }, [show]);

  return (
    <Col>
      <h5>Clasificacion de Proveedores</h5>
      <Table responsive hover className="mt-2">
        <thead>
          <tr>
            <th>Clasificacion de Proveedor</th>
            <th>
              <Button variant="success" onClick={(e) => setShow(true)}>
                Agregar
              </Button>
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
                <td>
                  <Button
                  onClick={(e) => {
                    setShow(true);
                    setData({
                      ...data,
                      idClasification: type.idClasification,
                      clasificationName: type.clasificationName
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
        {flag ? (<Modal.Title>Actualizar Clasificacion</Modal.Title>):(<Modal.Title>Agregar Clasificacion</Modal.Title>)}
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
