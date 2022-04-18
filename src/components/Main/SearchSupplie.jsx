import { Form, Row, Button, Col, Table } from "react-bootstrap";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchSupplie = (props) => {
  const URI = "http://localhost:3001/proveedores";

  const filtrar = (props) => {
    let resultSearching = tabSupplies.filter((element) => {
      if (
        element.nameSupplie
          .toString()
          .toLowerCase()
          .includes(props.toLowerCase()) ||
        element.bName.toString().toLowerCase().includes(props.toLowerCase()) ||
        element.clasificationName
          .toString()
          .toLowerCase()
          .includes(props.toLowerCase())
      ) {
        return element;
      } else return null;
    });
    setSupplies(resultSearching);
  };

  const HandleChange = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  };

  const resetSearch = () => {
    setSearch("");
    setSupplies(tabSupplies);
  };

  const [supplies, setSupplies] = useState([]);
  const [tabSupplies, setTabSupplies] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getSupplies();
  }, []);

  const getSupplies = async () => {
    const result = await axios.get(URI);
    setSupplies(result.data);
    setTabSupplies(result.data);
  };

  supplies.forEach((element) => {
    let DateInital = element.sDateInitial.split("T");
    let DateUpdate = element.sDateUpdate.split("T");
    element.sDateInitial = DateInital[0];
    element.sDateUpdate = DateUpdate[0];
  });

  return (
    <div className="container-side p-0">
      <NavBar brand={props.brand}></NavBar>
      <div className="container px-3 pt-3">
        <Form>
          <Form.Group as={Row}>
            <Form.Label column="true" sm={3} className="mt-3">
              Busqueda de Proveedor :
            </Form.Label>
            <Col className="pt-3">
              <Form.Control
                sm={4}
                value={search || ""}
                placeholder="Busqueda por Palabras clave"
                onChange={HandleChange}
              ></Form.Control>
            </Col>
            <Col>
              <Button
                className="btn btn-success mt-3"
                sm={1}
                onClick={resetSearch}
              >
                Limpiar
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
      <div className="Results container pt-3">
        Mostrando {supplies.length} Resultados
        <div className="container">
          {supplies.length !== 0 ? (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Nombre de Proveedor</th>
                  <th>Tipo de Negocio</th>
                  <th>Clasificacion</th>
                  <th>Fecha de Alta</th>
                  <th>Fecha de Ultima Actualizacion</th>
                  <th>Domicilios</th>
                  <th>Productos</th>
                </tr>
              </thead>
              <tbody>
                {supplies.map((supplie) => (
                  <tr key={supplie.idSupplie}>
                    <td>{supplie.nameSupplie}</td>
                    <td>{supplie.bName}</td>
                    <td>{supplie.clasificationName}</td>
                    <td>{supplie.sDateInitial}</td>
                    <td>{supplie.sDateUpdate}</td>
                    <td>
                      <Link
                        to={`/Domicilios/Proveedor/${supplie.idSupplie}`}
                        className="btn btn-primary center"
                      >
                        Domicilios
                      </Link>
                    </td>

                    <td>
                      <Link
                        to={`/Proveedores/Productos/${supplie.idSupplie}`}
                        className="btn btn-info"
                      >
                        Productos
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Proveedores</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>No hay proveedore Registrados</td>
                </tr>
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchSupplie;
