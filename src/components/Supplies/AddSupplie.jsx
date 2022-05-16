import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Tab, Table, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usePrompt } from "../../assets/blocks";
import { ADS, BST, SCT } from "../const/Const";
import Swal from "sweetalert2";

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
  const [isBlocking, setIsBlocking] = useState({
    band: false,
    message: 1,
    data: 0,
  });

  const getData = async () => {
    const business = await axios.get(BST);
    const sclas = await axios.get(SCT);
    setsclasificacion(sclas.data);
    setBusiness(business.data);
  };
  const SendDataS = async () => {
    try {
      if (
        dataS.FkBusinessType > 0 &&
        dataS.FkBusinessType > 0 &&
        dataS.nameSupplie !== ""
      ) {
        const { data } = await axios.post(ADS, dataS);
        if (data.value) {
          Swal.fire({
            icon:'success',
            title: 'Correcto',
            text: 'Provedor Agregador correctamente',
            timer:1500,
            timerProgressBar: true
          })
          setIdSup(data.insertId);
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'El Proveedor ya se encuentra registrado',
            timer:1500,
            timerProgressBar: true
          })
          
        }
      } else {
        Swal.fire({
          title: 'Advertencia',
          icon: 'warning',
          text: 'Todos los campos deben estar llenos',
          timer:1500,
          timerProgressBar: true
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const message = (type) => {
    switch (type) {
      case 1:
        return "Estas Seguro de Salir sin Guardar el Domicilio";
      case 2:
        return "No has guardado Producto estas seguro de Salir";
      case 3:
        return "El domicilio no cuenta con un contacto";
      default:
        return null;
    }
  };

  usePrompt(message(isBlocking.message), isBlocking.band);
  return (
    <div className="flex">
      <SideBar />
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
                    setDataS({
                      ...dataS,
                      FkBusinessType: Number(e.target.value),
                    })
                  }
                >
                  <option>Selecciona un tipo de Negocio</option>
                  {businessType.map((type) => (
                    <option
                      key={type.idBusinessType}
                      value={type.idBusinessType}
                    >
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
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      SendDataS();
                      setIsBlocking({ band: true, message: 1, data: 1 });
                    }}
                  >
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
                <AddAdressSup
                  FkSupplieAd={idSupplie}
                  isBlocking={isBlocking}
                  setIsBlocking={setIsBlocking}
                />
              </Tab>
              <Tab eventKey="Productos" title="Productos" className="mb-3">
                <Form className="container mt-3">
                  <AsingProductSup
                    idP={0}
                    idSupplie={idSupplie}
                    isBlocking={isBlocking}
                    setIsBlocking={setIsBlocking}
                  />
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
      </div>
    </div>
  );
};
export default AddSupplie;
