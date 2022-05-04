import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Table, Form, Row, Col, Button } from "react-bootstrap";
import NavBar from "./NavBar";
import ModalAsing from "./ModalAsing";
import { PBI, SBF, SPS } from "../const/Const";
import AddProduct from "./AddProduct";
import SideBar from "./SideBar";
import { UserContext } from "../ContextUser/UserContext";

const ShowSupplieProduct = (props) => {
  const [state] = useContext(UserContext);
  const user = state.user;
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [supplie, setsupplie] = useState(0);
  const [supplies, setSupplies] = useState([]);
  const [Asing, setAsing] = useState([]);
  const [showPe, setSPe] = useState(false);
  const [show, setShow] = useState(false);
  const handleClosePE = () =>setSPe(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    getData();
  }, [show]);

  useEffect(() => {
    if (supplies) {
      supplies.forEach((element) => {
        let DateInital = element.pDateInitial.split("T");
        let DateUpdate = element.pDateUpdate.split("T");
        element.pDateInitial = DateInital[0];
        element.pDateUpdate = DateUpdate[0];
      });
      getAsing();
    }
  }, [supplies]);

  const getAsing = async () => {
    const { data } = await axios.get(SBF);
    const filterData = data.filter(
      (element) => !supplies.find((sup) => sup.idSupplie === element.idSupplie)
    );
    setAsing(filterData);
  };
  const getData = async () => {
    const result = await axios.get(`${SPS}${id}`);
    const product = await axios.get(`${PBI}${id}`);
    setSupplies(result.data);
    setProduct(product.data[0]);
  };

  //Componente para Renderizado condicional
  return (
    <div className="flex">
      <SideBar/>
      <div className="container-side p-0">
      <NavBar brand={props.brand}></NavBar>
      <div className="container px-3 pt-3 ">
        <Form>
          <Form.Group as={Row} className="mb-3 ">
            <Form.Label column sm={2}>
              Nombre del Producto:
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                plaintext
                readOnly
                value={product.productName || ""}
              />
            </Col>
            <Form.Label column sm={2}>
              Descripcion del Producto:
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                as="textarea"
                rows={2}
                plaintext
                readOnly
                value={product.descriptionProduct || ""}
              />
            </Col>
            <Form.Label column sm={2}>
              Tecnologia:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                plaintext
                readOnly
                value={product.nameTechnology || ""}
              />
            </Col>
          </Form.Group>
          {user.FkRole === 1 ||
                  user.FkRole === 2 ||
                  user.FkRole === 3 ||
                  user.FkRole === 999 ?(<Form.Group as={Row} className="mb-3 ">
{user.FkRole === 1 ||
                  user.FkRole === 2 ||
                  user.FkRole === 999 ?(<Col sm={2}>
              
              <AddProduct show={showPe} handleCloseP={handleClosePE} product={product}></AddProduct>
              <Button onClick={e=> setSPe(true)}>Editar Producto</Button>
            </Col>):(<></>)}
            
            <Col>
              <Form.Select onChange={(e) => setsupplie(Number(e.target.value))}>
                <option value={0}>Selecciona un Proveedor para Asignar</option>
                {Asing.map((asing) => (
                  <option key={asing.idSupplie} value={asing.idSupplie}>
                    {asing.nameSupplie}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <ModalAsing
                show={show}
                handleClose={handleClose}
                idProduct={product.idProduct}
                idSupplie={supplie}
              ></ModalAsing>
              <Button
                disabled={supplie === 0}
                className="btn btn-success"
                onClick={(e) => setShow(true)}
              >
                Asignar Proveedor
              </Button>
            </Col>
          </Form.Group>):(<></>)}
          
        </Form>
        {supplies.length !== 0 ? (
          <Table responsive hover>
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>Tiempo de Entrega</th>
                <th>Linea de Producto</th>
                <th>Comentarios</th>
                <th>Precio</th>
                <th>Fecha de Registro</th>
                <th>Fecha de Actualizacion</th>
                <th>Muestra Fisica</th>
                <th>contactos</th>
              </tr>
            </thead>
            {
              <tbody>
                {supplies.map((supplie) => (
                  <tr key={supplie.idSupply}>
                    <td>{supplie.nameSupplie}</td>
                    <td>{supplie.deliveryTime}</td>
                    <td>{supplie.productLine}</td>
                    <td>{supplie.comments}</td>
                    <td>{supplie.price}</td>
                    <td>
                      <div className="size">{supplie.pDateInitial}</div>
                    </td>
                    <td>
                      <div className="size">{supplie.pDateUpdate}</div>
                    </td>
                    <td>{supplie.pSampleLocation}</td>
                    <td>
                      <Link
                        to={`/Domicilios/Proveedor/${supplie.idSupplie}`}
                        className="btn btn-outline-primary"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            }
          </Table>
        ) : (
          <Form>
            <Form.Label>
              El Producto no cuenta con Proveedores Asignados
            </Form.Label>
          </Form>
        )}
      </div>
    </div></div>
    
  );
};
export default ShowSupplieProduct;
