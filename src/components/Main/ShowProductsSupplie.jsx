import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Form, Row, Col, Button } from "react-bootstrap";
import NavBar from "./NavBar";
import { PBS, SBI } from "../const/Const";
import ModalAsing from "./ModalAsing";

const ShowProductsSupplie = (props) => {
  const { id } = useParams();
  const SPS = `${PBS}${id}`;
  const SSI = `${SBI}${id}`;
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
    const { data } = await axios.get(SPS);
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
    const { data } = await axios.get(SSI);
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
            <ModalAsing
              show={show}
              handleClose={handleClose}
              idSupplie={supplie.idSupplie}
              idProduct={0}
            />
            <Button className="btn btn-warning" onClick={(e) => setShow(true)}>
              Agregar Producto
            </Button>
            <Link
              to={`/Domicilios/Proveedor/${supplie.idSupplie}`}
              className="btn btn-success mx-3"
            >
              Mostrar Domicilio
            </Link>
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
                <th>Editar Relacion</th>
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
                  <td>
                    <Button
                      className="btn btn-warning"
                      onClick={(e) => {
                        setMoA(true);
                        setSupply(product);
                      }}
                    >
                      Editar
                    </Button>
                  </td>
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
  );
};
export default ShowProductsSupplie;
