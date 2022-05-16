import { Form, Row, Button, Col, Table, Modal, ModalTitle } from "react-bootstrap";
import NavBar from "./NavBar";
import { useState, useEffect, useContext } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { DSF, SBF } from "../const/Const";
import SideBar from "./SideBar";
import { UserContext } from "../ContextUser/UserContext";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import BusinessIcon from '@material-ui/icons/Business';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Swal from 'sweetalert2'

const SearchSupplie = (props) => {
  const [state] = useContext(UserContext);
  const user = state.user;
  const [supplies, setSupplies] = useState([]);
  const [tabSupplies, setTabSupplies] = useState([]);
  const [search, setSearch] = useState("");
  const [flag, setFlag] = useState(false)

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
  useEffect(() => {
    getSupplies();
  }, []);
  const getSupplies = async () => {
    const result = await axios.get(SBF);
    setSupplies(result.data);
    setTabSupplies(result.data);
  };
  supplies.forEach((element) => {
    let DateInital = element.sDateInitial.split("T");
    let DateUpdate = element.sDateUpdate.split("T");
    element.sDateInitial = DateInital[0];
    element.sDateUpdate = DateUpdate[0];
  });
  useEffect(()=>{
    if(supplies)
    {
      getSupplies()
    }
  },[flag])
  
  const deleteSupplie= (e,id)=>{
    Swal.fire({
      title: 'Estas seguro que deseas borrar',
      text: "Esta Operacion no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          {timer:2000,
          timerProgressBar: true,
          title:'Borrado',
          text:'El proveedor fue borrado con exito',
          icon:'success'
        } 
        )
         try {
       axios.delete(`${DSF}/${id}`).then(()=>{
        setFlag(!flag)
      })
      

    } catch (error) {
      console.log(error)
    }
      }
    })
   
  }
  return (
    <div className="flex">
      <SideBar />
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
                    <th>Fecha de Actualizacion</th>
                    <th>Domicilios</th>
                    <th>Productos</th>
                    {user.FkRole === 1 ||
                    user.FkRole === 999 ? (
                      <>
                        {/* <th>Editar</th> */}
                        <th>Borrar</th>
                      </>
                    ) : (
                      <></>
                    )}
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
                        ><IconButton style={{color: "#fa5d02"}}><BusinessIcon>
                          </BusinessIcon></IconButton>
                        </Link>
                        
                      </td>

                      <td>
                        <Link
                          to={`/Proveedores/Productos/${supplie.idSupplie}`}
                          
                        >
                         <IconButton style={{color: "rgba(6, 10, 71, 0.91)"}}><StorefrontIcon>
                          </StorefrontIcon></IconButton>
                        </Link>
                      </td>
                      {user.FkRole === 1 ||
                      user.FkRole === 999 ? (
                        <>
                          {/* <th>
                            <IconButton>
                              <EditIcon color="primary"></EditIcon>
                            </IconButton>
                          </th> */}
                          <th>
                            <Modal>
                                <ModalTitle>
                                  
                                </ModalTitle>
                            </Modal>
                            <IconButton color="secondary" onClick={e=>deleteSupplie(e,supplie.idSupplie)}>
                              <DeleteIcon></DeleteIcon>
                            </IconButton>
                          </th>
                        </>
                      ) : (
                        <></>
                      )}
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
                    <td>No hay proveedores Registrados</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchSupplie;
