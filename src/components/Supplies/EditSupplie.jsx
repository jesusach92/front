import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { BUSINESS_TYPE, SUPPLIE, S_CLASIFICATION } from "../const/Const";
import { UserContext } from "../ContextUser/UserContext";

const initialValuesS = {
  nameSupplie: "",
  FkBusinessType: 0,
  FkClasification: 0,
};

const EditSupplie = ({ show, handleClose, supplie, setFlag, flag }) => {
  const [state] = useContext(UserContext);
  const { user } = state;
  const [data, setData] = useState(initialValuesS);
  const [business, setBusiness] = useState([]);
  const [sclasification, setSclasification] = useState([]);

  const getBusiness = async () => {
    const result = await axios.get(BUSINESS_TYPE);
    setBusiness(result.data);
  };
  const getSClass = async () => {
    const { data } = await axios.get(S_CLASIFICATION);
    setSclasification(data);
  };

  useEffect(() => {
    getBusiness();
    getSClass();
  }, []);

  useEffect(() => {
    if (supplie !== undefined)
      setData({ ...supplie, userUpdate: Number(user.idUsers) });
  }, [supplie]);

  const SendData = async () => {
    try {
      if (
        data.FkBusinessType > 0 &&
        data.FkBusinessType > 0 &&
        data.nameSupplie !== ""
      ) {
        const result = await axios.put(SUPPLIE, data);
        if (result.data.value === 1) {
          setFlag(!flag);
          Swal.fire({
            icon: "success",
            title: "Correcto",
            text: "Provedor Actualizado correctamente",
            timer: 1500,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "No se pudo realizar la actualizacion",
            timer: 1500,
            timerProgressBar: true,
          });
        }
      } else {
        Swal.fire({
          title: "Advertencia",
          icon: "warning",
          text: "Todos los campos deben estar llenos",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar Proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mt-2">
          <Form.Group as={Row}>
            <Form.Label column="true" sm={3}>
              Nombre de Proveedor:
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                placeholder="Nombre del Proveedor"
                value={data.nameSupplie}
                onChange={(e) =>
                  setData({ ...data, nameSupplie: e.target.value })
                }
              />
            </Col>
            <Form.Label column="true" sm={2}>
              Tipo de Negocio:
            </Form.Label>
            <Col sm={4}>
              <Form.Select
                value={data.FkBusinessType}
                onChange={(e) =>
                  setData({
                    ...data,
                    FkBusinessType: Number(e.target.value),
                  })
                }
              >
                <option>Selecciona un tipo de Negocio</option>
                {business.map((type) => (
                  <option key={type.idBusinessType} value={type.idBusinessType}>
                    {type.bName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column="true" sm={3}>
              Correo Electronico:
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                placeholder="Correo Principal"
                value={data.emailSupplie}
                onChange={(e) =>
                  setData({ ...data, emailSupplie: e.target.value })
                }
              />
            </Col>
            <Form.Label column="true" sm={3}>
              Telefono:
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                placeholder="Telefono Principal"
                maxLength={25}
                value={data.contactPhone}
                onChange={(e) =>
                  setData({ ...data, contactPhone: e.target.value })
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mt-4">
            <Form.Label column="true" sm={3}>
              Clasificacion:
            </Form.Label>
            <Col sm={4}>
              <Form.Select
                value={data.FkClasification}
                onChange={(e) =>
                  setData({
                    ...data,
                    FkClasification: Number(e.target.value),
                  })
                }
              >
                <option>Selecciona la Clasificacion</option>
                {sclasification.map((type) => (
                  <option
                    key={type.idClasification}
                    value={type.idClasification}
                  >
                    {type.clasificationName}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Form.Label column="true" sm={2}>
              Pagina Web:
            </Form.Label>
            <Col>
              <Form.Control
                placeholder="Pagina Web"
                maxLength={45}
                value={data.webPage}
                onChange={(e) => setData({ ...data, webPage: e.target.value })}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mt-4">
            <Col>
              <Button
                variant="primary"
                onClick={(e) => {
                  SendData();
                  handleClose();
                }}
              >
                Guardar
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSupplie;
