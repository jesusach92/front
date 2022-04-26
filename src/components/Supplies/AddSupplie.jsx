import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Tab, Table, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ADS, BST, SCT } from "../const/Const";

import NavBar from "../Main/NavBar";
import SideBar from "../Main/SideBar";
import AddAdressSup from "./Adress/AddAdressSup";
import AsingProductSup from "./Products/AsingProductSup";

const initialValuesS = {
  nameSupplie: "",
  FkBusinessType: 0,
  FkClasification: 0,
};

const AddSupplie = (props) => {
  const [businessType, setBusiness] = useState([]);
  const [sclasificacion, setsclasificacion] = useState([]);
  const [dataS, setDataS] = useState(initialValuesS);
  const [idSupplie, setIdSup] = useState(0);
  const [key, setKey] = useState("Domicilio");

  const getData = async () => {
    const business = await axios.get(BST);
    const sclas = await axios.get(SCT);
    setsclasificacion(sclas.data);
    setBusiness(business.data);
  };
  const SendDataS = async () => {
    if (
      dataS.FkBusinessType > 0 &&
      dataS.FkBusinessType > 0 &&
      dataS.nameSupplie !== ""
    ) {
      const { data } = await axios.post(ADS, dataS);
      if (data.value) {
        alert("Proveedor Agregardo Correctamente");
        setIdSup(data.insertId);
      } else {
        alert("El Proveedor ya se encuentra registrado");
      }
    } else {
      alert("Todos los campos deben estar llenos");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex">
      <SideBar/>
      <div className="container-side p-0">
      <NavBar brand={props.brand} />
      <div className="container pt-3">
        <Form className="mt-2">
          <Form.Group as={Row}>
            <Form.Label column="true" sm={3}>
              <h5>Registro de Proveedor</h5>
            </Form.Label>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column="true" sm={3}>
              Nombre de Proveedor:
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                placeholder="Nombre del Proveedor"
                readOnly={!(idSupplie === 0)}
                plaintext={!(idSupplie === 0)}
                value={dataS.nameSupplie}
                onChange={(e) =>
                  setDataS({ ...dataS, nameSupplie: e.target.value })
                }
              />
            </Col>
            <Form.Label column="true" sm={2}>
              Tipo de Negocio:
            </Form.Label>
            <Col sm={4}>
              <Form.Select
                onChange={(e) =>
                  setDataS({ ...dataS, FkBusinessType: Number(e.target.value) })
                }
              >
                <option>Selecciona un tipo de Negocio</option>
                {businessType.map((type) => (
                  <option key={type.idBusinessType} value={type.idBusinessType}>
                    {type.bName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mt-4">
            <Form.Label column="true" sm={3}>
              Clasificacion:
            </Form.Label>
            <Col sm={3}>
              <Form.Select
                onChange={(e) =>
                  setDataS({
                    ...dataS,
                    FkClasification: Number(e.target.value),
                  })
                }
              >
                <option>Selecciona la Clasificacion</option>
                {sclasificacion.map((type) => (
                  <option
                    key={type.idClasification}
                    value={type.idClasification}
                  >
                    {type.clasificationName}
                  </option>
                ))}
              </Form.Select>
            </Col>
            {idSupplie === 0 ? (
              <Col>
                <Button variant="primary" onClick={SendDataS}>
                  Guardar
                </Button>
              </Col>
            ) : (
              <Col>
                <Link to="/">
                  <Button variant="primary">Salir</Button>
                </Link>
              </Col>
            )}
          </Form.Group>
        </Form>
        {idSupplie !== 0 ? (
          <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="Domicilio" title="Domicilio">
              <AddAdressSup FkSupplieAd={idSupplie} />
            </Tab>
            <Tab eventKey="Productos" title="Productos" className="mb-3">
              <Form className="container mt-3">
                <AsingProductSup idP={0} idSupplie={idSupplie} />
              </Form>
            </Tab>
          </Tabs>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Registrar Datos </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Guardar Proveedor para registrar más Campos</td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    </div></div>
    
  );
};
export default AddSupplie;
