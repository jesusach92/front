import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Table, Form, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import { PRODUCTS, SUPPLIE, SUPPLYS } from "../const/Const";
import ModalAsing from "./ModalAsing";
import SideBar from "./SideBar";
import { Button, IconButton } from "@material-ui/core";
import { UserContext } from "../ContextUser/UserContext";
import EditIcon from "@material-ui/icons/Edit";

const ShowProductsSupplie = (props) => {
  const [state] = useContext(UserContext);
  const { user } = state;
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [supplie, setSupplie] = useState([]);
  const [Supply, setSupply] = useState([]);
  const [show, setShow] = useState(false);
  const [showMoA, setMoA] = useState(false);
  const handleCloseMA = () => setMoA(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    getSupplie();
  }, []);

  useEffect(() => {
    getProducts();
  }, [showMoA]);

  const getProducts = async () => {
    const { data } = await axios.get(`${SUPPLYS}/supplie/${id}`);
    data.map((dat) => {
      let [pDateInitial] = dat.pDateInitial.split("T");
      dat.pDateInitial = pDateInitial;
      let [pDateUpdate] = dat.pDateUpdate.split("T");
      dat.pDateUpdate = pDateUpdate;
      return dat;
    });
    setProducts(data);
  };
  const getSupplie = async () => {
    const { data } = await axios.get(`${SUPPLIE}/${id}`);
    data.map((dat) => {
      let [sDateInitial] = dat.sDateInitial.split("T");
      dat.sDateInitial = sDateInitial;
      let [sDateUpdate] = dat.sDateUpdate.split("T");
      dat.sDateUpdate = sDateUpdate;
      return dat;
    });
    setSupplie(data[0]);
  };
  //Retorno del renderizado condicional
  return (
    <div className="flex">
      <SideBar />
      <div className="container-side p-0">
        <NavBar brand={props.brand}></NavBar>
        <div className="container px-3 pt-3 ">
          <Form>
            <Form.Group as={Row} className="mb-3 ">
              <Form.Label column sm={2}>
                Nombre de Proveedor:
              </Form.Label>
              <Col sm={3}>
                <Form.Control
                  as="textarea"
                  rows={2}
                  plaintext
                  readOnly
                  value={supplie.nameSupplie || ""}
                />
              </Col>
              <Form.Label column sm={2}>
                Tipo de Proveedor:
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="text"
                  plaintext
                  readOnly
                  value={supplie.bName || ""}
                />
              </Col>
              <Form.Label column sm={2}>
                Descripcion de Negocio:
              </Form.Label>
              <Col sm={3}>
                <Form.Control
                  as="textarea"
                  rows={2}
                  plaintext
                  readOnly
                  value={supplie.bDescription || ""}
                />
              </Col>
              <Form.Label column sm={2}>
                Clasificacion:
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  plaintext
                  readOnly
                  value={supplie.clasificationName || ""}
                />
              </Col>
              <Form.Label column sm={2}>
                Fecha de Registro:
              </Form.Label>
              <Col sm={3}>
                <Form.Control
                  plaintext
                  readOnly
                  value={supplie.sDateInitial || ""}
                />
              </Col>
              <Form.Label column sm={2}>
                Fecha de Ultima actualizacion:
              </Form.Label>
              <Col sm={3}>
                <Form.Control
                  plaintext
                  readOnly
                  value={supplie.sDateUpdate || ""}
                />
              </Col>
            </Form.Group>
            <Form.Group>
              {user.FkRole === 1 ||
              user.FkRole === 2 ||
              user.FkRole === 3 ||
              user.FkRole === 999 ? (
                <>
                  <ModalAsing
                    show={show}
                    handleClose={handleClose}
                    idSupplie={supplie.idSupplie}
                    idProduct={0}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => setShow(true)}
                  >
                    Agregar Producto
                  </Button>
                </>
              ) : (
                <></>
              )}

              <Button
                variant="contained"
                style={{ backgroundColor: "#00695f" }}
                className="mx-3"
              >
                <Link
                  to={`/Domicilios/Proveedor/${supplie.idSupplie}`}
                  className="link-btn"
                >
                  Mostrar Domicilio
                </Link>
              </Button>
            </Form.Group>
          </Form>
          {!products.length ? (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Productos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>El Proveedor no cuenta con productos asignados</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Nombre del Producto</th>
                  <th>Descripcion</th>
                  <th>Tiempo de Entrega</th>
                  <th>Tipo de Entrega</th>
                  <th>Precio</th>
                  <th>Divisa</th>
                  <th>Fecha de Registro</th>
                  <th>Ultima Actualizacion</th>
                  <th>Muestra Fisica</th>
                  <th>Ubicacion de Muestra</th>
                  <th>Comentarios</th>
                  {user.FkRole === 1 ||
                  user.FkRole === 2 ||
                  user.FkRole === 999 ? (
                    <th>Editar Relacion</th>
                  ) : (
                    <></>
                  )}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.idSupply}>
                    <td>{product.productName}</td>
                    <td>{product.descriptionProduct}</td>
                    <td>{product.deliveryTime}</td>
                    <td>{product.productLine}</td>
                    <td>{product.price}</td>
                    <td>{product.divisa}</td>
                    <td>
                      <div className="size">{product.pDateInitial}</div>
                    </td>
                    <td>
                      <div className="size">{product.pDateUpdate}</div>
                    </td>
                    <td>
                      {Number(product.pSampleF) === 1
                        ? "Contamos con muestra"
                        : "No contamos con muestra"}
                    </td>
                    <td>{product.pSampleLocation}</td>
                    <td>{product.comments}</td>
                    {user.FkRole === 1 ||
                    user.FkRole === 2 ||
                    user.FkRole === 999 ? (
                      <td>
                        <IconButton
                          color="primary"
                          onClick={(e) => {
                            setMoA(true);
                            setSupply(product);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </td>
                    ) : (
                      <></>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <ModalAsing
            show={showMoA}
            handleClose={handleCloseMA}
            idSupplie={supplie.idSupplie}
            idProduct={Supply.FkProductSpy}
            Supply={Supply}
          />
        </div>
      </div>
    </div>
  );
};
export default ShowProductsSupplie;
