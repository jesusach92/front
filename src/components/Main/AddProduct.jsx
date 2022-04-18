import { useEffect, useState } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { ADP, TEC, UPF } from "../const/Const";

const initialValues = {
  FkTechnologyPro: 0,
  productName: "",
  descriptionProduct: "",
};
const AddProduct = ({ show, handleCloseP, setidProduct, product }) => {
  const [tech, setTech] = useState([]);
  const [DataP, setDataP] = useState(initialValues);
  const getTech = async () => {
    try {
      const { data } = await axios.get(TEC);
      setTech(data);
    } catch (e) {}
  };
  useEffect(() => {
    getTech();
  }, []);

  useEffect(() => {
    if (product !== undefined) setDataP(product);
  }, [product]);

  const UpdateDataP = async () => {
    if (
      !(
        DataP.FkTechnologyPro === 0 ||
        DataP.productName === "" ||
        DataP.descriptionProduct === ""
      )
    ) {
      await axios
        .put(UPF, DataP)
        .then((result) => {
          alert("Producto Actualizado con Exito");
          handleCloseP()
          setDataP(initialValues)
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const SendDataP = async () => {
    if (
      !(
        DataP.FkTechnologyPro === 0 ||
        DataP.productName === "" ||
        DataP.descriptionProduct === ""
      )
    ) {
      const result = await axios.post(ADP, DataP);

      if (result.data.value === 1) {
        handleCloseP();
        if (setidProduct) setidProduct(result.data.insertId);
        alert("Producto Agregado Existosamente");
      }
      setDataP(initialValues);
    } else {
      window.alert("Todos los campos tienen que estar llenos");
    }
  };

  return (
    <Modal show={show} onHide={handleCloseP}>
      <Modal.Header>
        <Modal.Title>Agregar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column="true" sm={4}>
              Tecnologia del producto:
            </Form.Label>
            <Col sm={8}>
              <Form.Select
                onChange={(e) => {
                  setDataP({
                    ...DataP,
                    FkTechnologyPro: Number(e.target.value),
                  });
                }}
              >
                <option>Selecciona el tipo de Tenologia</option>
                {tech.map((type) => (
                  <option value={type.idTechnology} key={type.idTechnology}>
                    {type.nameTechnology}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mt-4">
            <Form.Label column="true" sm={4}>
              Nombre del Producto
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                placeholder="Nombre del Producto"
                onChange={(e) => {
                  setDataP({ ...DataP, productName: e.target.value });
                }}
                value={DataP.productName || ""}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mt-4">
            <Form.Label column="true" sm={4}>
              Descripcion:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                placeholder="Agrega una breve descripcion del producto"
                as="textarea"
                rows={2}
                onChange={(e) => {
                  setDataP({ ...DataP, descriptionProduct: e.target.value });
                }}
                value={DataP.descriptionProduct || ""}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={(e) => {
            handleCloseP();
          }}
        >
          Cerrar
        </Button>
        {product ? (
          <Button variant="success" onClick={UpdateDataP}>
            Actualizar Producto
          </Button>
        ) : (
          <Button variant="success" onClick={SendDataP}>
            Agregar Producto
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default AddProduct;
