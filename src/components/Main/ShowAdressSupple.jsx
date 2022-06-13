import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Table, Form, Row, Col, Modal } from "react-bootstrap";
import NavBar from "./NavBar";
import ModalAdress from "./ModalAdress";
import ModalContact from "./ModalContact";
import ModalContactUpdate from "./ModalContactUpdate";
import { ADRESS, CONTACTS, SUPPLIE } from "../const/Const";
import SideBar from "./SideBar";
import { UserContext } from "../ContextUser/UserContext";
import { Button, IconButton } from "@material-ui/core";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";

const ShowAdressSupplie = (props) => {
  const [state] = useContext(UserContext);
  const { id } = useParams();
  const [supplie, setSupplie] = useState([]);
  const [adress, setAdress] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contact, setcontact] = useState([]);
  const { user } = state;
  const [showUpC, setshowUpC] = useState(false);
  const [ModAdress, setModalAdress] = useState(false);
  const [ModContact, setModContact] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = (e, idAdress) => {
    setShow(true);
    getContacts(idAdress);
  };
  const handleCloseUpC = () => setshowUpC(false);
  const HideCont = () => setModContact(false);
  const HideAdd = () => setModalAdress(false);

  useEffect(() => {
    getAdrees();
    return () => null
  }, [show, ModAdress]);

  useEffect(() => {
    getSupplie();
    return () => null
  }, []);

  const getSupplie = async () => {
    try {
      const { data } = await axios.get(`${SUPPLIE}/${id}`);
      let [dateinital] = data[0].sDateInitial.split("T");
      let [dateUpdate] = data[0].sDateUpdate.split("T");
      data[0].sDateInitial = dateinital;
      data[0].sDateUpdate = dateUpdate;
      setSupplie(data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const getAdrees = async () => {
    try {
      const tadress = await axios.get(`${ADRESS}/${id}`);
      setAdress(tadress.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getContacts = async (idAdress) => {
    const { data } = await axios.get(`${CONTACTS}/${idAdress}`);
    setContacts(data);
  };
  const deleteContact = async (e, Contact) => {
    Swal.fire({
      title: "Estas seguro que deseas borrar",
      text: "Esta Operacion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,

      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borralo",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`${CONTACTS}/${Contact.idContact}`).then(() => {
            Swal.fire({
              timer: 2000,
              timerProgressBar: true,
              title: "Borrado",
              text: "El Contacto fue borrado con exito",
              icon: "success",
            });
            getContacts(Contact.FkAdressCont);
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const deleteAd = async (e, idad) => {
    Swal.fire({
      title: "Estas seguro que deseas borrar",
      text: "Esta Operacion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,

      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borralo",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`${ADRESS}/${idad}`).then(() => {
            Swal.fire({
              timer: 2000,
              timerProgressBar: true,
              title: "Borrado",
              text: "El Domicilio fue borrado con exito",
              icon: "success",
            });
            getAdrees();
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  //Componente para Renderizado condicional
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
                  <ModalAdress
                    show={ModAdress}
                    handleClose={HideAdd}
                    idSupplie={id}
                  />
                  <Button
                    onClick={(e) => setModalAdress(true)}
                    variant="contained"
                    color="primary"
                  >
                    Agregar Domicilio
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
                  className="link-btn"
                  to={`/Proveedores/Productos/${supplie.idSupplie}`}
                >
                  Mostrar Productos
                </Link>
              </Button>
            </Form.Group>
          </Form>
          {adress.length === 0 ? (
            <Form className="mt-5">
              <Form.Label>
                El Proveedor no cuenta con domicilios registrados
              </Form.Label>
            </Form>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Domicilio de contacto</th>
                  <th>Tipo de Domicilio</th>
                  <th>País</th>
                  <th>Estado</th>
                  <th>Direccion</th>
                  <th>Comentarios</th>
                  <th>Contactos</th>
                  {user.FkRole === 1 ||
                  user.FkRole === 2 ||
                  user.FkRole === 3 ||
                  user.FkRole === 999 ? (
                    <th>Agregar contacto</th>
                  ) : (
                    <></>
                  )}
                  {user.FkRole === 1 ||
                  user.FkRole === 2 ||
                  user.FkRole === 999 ? (
                    <th>Editar</th>
                  ) : (
                    <></>
                  )}
                  {user.FkRole === 1 || user.FkRole === 999 ? (
                    <th>Borrar</th>
                  ) : (
                    <></>
                  )}
                </tr>
              </thead>
              <tbody>
                {adress.map((adres) => (
                  <tr key={adres.idAdress}>
                    <td valign="middle">
                      {adres.adressPrincipal.data[0] === 1
                        ? "Domicilio de principal contacto"
                        : "Domicilio Secundario"}
                    </td>
                    <td valign="middle">{adres.aType}</td>
                    <td valign="middle">{adres.adressCountry}</td>
                    <td valign="middle">{adres.adressState}</td>
                    <td valign="middle">{adres.adressDescription}</td>
                    <td valign="middle">{adres.aComments}</td>
                    <td>
                      <IconButton
                        style={{ color: "#2c387e" }}
                        onClick={(e) => handleShow(e, adres.idAdress)}
                      >
                        <ContactPhoneIcon fontSize="large" />
                      </IconButton>
                    </td>
                    {user.FkRole === 1 ||
                    user.FkRole === 2 ||
                    user.FkRole === 3 ||
                    user.FkRole === 999 ? (
                      <td align="center">
                        <ModalContact
                          show={ModContact}
                          handleClose={HideCont}
                          idAdress={adres.idAdress}
                        ></ModalContact>
                        <IconButton
                          style={{ color: "#ff5722" }}
                          onClick={(e) => setModContact(true)}
                        >
                          <PersonAddIcon fontSize="large"></PersonAddIcon>
                        </IconButton>
                      </td>
                    ) : (
                      <></>
                    )}
                    {user.FkRole === 1 ||
                    user.FkRole === 2 ||
                    user.FkRole === 999 ? (
                      <td align="center">
                        <IconButton color="primary">
                          <EditIcon fontSize="large"></EditIcon>
                        </IconButton>
                      </td>
                    ) : (
                      <></>
                    )}
                    {user.FkRole === 1 || user.FkRole === 999 ? (
                      <td align="center">
                        <IconButton
                          color="secondary"
                          onClick={(e) => {
                            deleteAd(e, adres.idAdress);
                          }}
                        >
                          <DeleteIcon fontSize="large"></DeleteIcon>
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
          <Modal show={show} size="lg" onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Contactos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {contacts.length === 0 ? (
                <Form>
                  <Form.Label>
                    El domicilio no tiene contactos registrados
                  </Form.Label>
                </Form>
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Nombre del Contacto:</th>
                      <th>Estado de Contacto</th>
                      <th>Puesto</th>
                      <th>Numero de Oficina</th>
                      <th>Numero Celular</th>
                      <th>Correo</th>
                      <th>Comentarios</th>
                      {user.FkRole === 1 ||
                      user.FkRole === 2 ||
                      user.FkRole === 999 ? (
                        <th>Editar contacto</th>
                      ) : (
                        <></>
                      )}
                      {user.FkRole === 1 || user.FkRole === 999 ? (
                        <th>Borrar Contacto</th>
                      ) : (
                        <></>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.idContact}>
                        <td>{contact.nameContact}</td>
                        <td>
                          {contact.contactPrincipal === 1
                            ? "Contacto Principal"
                            : "Contacto Secundario"}
                        </td>
                        <td>{contact.workposition}</td>
                        <td>{contact.officeNumber}</td>
                        <td>{contact.cellphoneNumber}</td>
                        <td>{contact.emailContact}</td>
                        <td>{contact.comments}</td>
                        {user.FkRole === 1 ||
                        user.FkRole === 2 ||
                        user.FkRole === 999 ? (
                          <td>
                            <IconButton
                              color="primary"
                              onClick={(e) => {
                                setcontact(contact);
                                setshowUpC(true);
                              }}
                            >
                              <EditIcon></EditIcon>
                            </IconButton>
                          </td>
                        ) : (
                          <></>
                        )}
                        {user.FkRole === 1 || user.FkRole === 999 ? (
                          <td>
                            <IconButton
                              color="primary"
                              onClick={(e) => {
                                deleteContact(e, contact);
                              }}
                            >
                              <DeleteIcon></DeleteIcon>
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
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShow(false)}
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <ModalContactUpdate
          show={showUpC}
          handleClose={handleCloseUpC}
          contact={contact}
        />
      </div>
    </div>
  );
};
export default ShowAdressSupplie;
