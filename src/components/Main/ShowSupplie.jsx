import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Link } from "react-router-dom";
import BusinessIcon from "@material-ui/icons/Business";
import StorefrontIcon from "@material-ui/icons/Storefront";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import axios from "axios";
import { SUPPLIE } from "../const/Const";
import EditSupplie from "../Supplies/EditSupplie";
import { UserContext } from "../ContextUser/UserContext";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { Button, Col, Form, Row as Fila } from "react-bootstrap";
import { TableSortLabel } from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';

const ShowSupplie = (props) => {
  const [state] = useContext(UserContext);
  const user = state.user;
  const [supplies, setSupplies] = useState([]);
  const [tabSupplies, setTabSupplies] = useState([]);
  const [supplieEdit, setSupplieEdit] = useState({});
  const [search, setSearch] = useState("");
  const [flag, setFlag] = useState(false);
  const [show, setshow] = useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nameSupplie");

  const handleClose = () => {
    setshow(false);
  };
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });
  useEffect(() => {
    getSupplies();
  }, []);

  const getSupplies = async () => {
    const result = await axios.get(SUPPLIE);
    setSupplies(result.data);
    setTabSupplies(result.data);
  };
  const createData = (supplie) => {
    const adress = (
      <Link to={`/Domicilios/Proveedor/${supplie.idSupplie}`}>
        <IconButton style={{ color: "#fa5d02" }}>
          <BusinessIcon></BusinessIcon>
        </IconButton>
      </Link>
    );
    const products = (
      <Link to={`/Proveedores/Productos/${supplie.idSupplie}`}>
        <IconButton style={{ color: "rgba(6, 10, 71, 0.91)" }}>
          <StorefrontIcon></StorefrontIcon>
        </IconButton>
      </Link>
    );

    const catalog = (
      <IconButton
	  disabled={supplie.catalog === "none"}
	  >
<GetAppIcon></GetAppIcon>
      </IconButton>
    )
    const edit = (
      <IconButton
        onClick={(e) => {
          setshow(true);
          setSupplieEdit(supplie);
        }}
      >
        <EditIcon color="primary"></EditIcon>
      </IconButton>
    );
    const deleteIcon = (
      <IconButton
        color="secondary"
        onClick={(e) => deleteSupplie(e, supplie.idSupplie)}
      >
        <DeleteIcon></DeleteIcon>
      </IconButton>
    );
    
    const {
      idSupplie,
      nameSupplie,
      bName,
      clasificationName,
      sDateInitial,
      sDateUpdate,
      emailSupplie,
      contactPhone,
      webPage,
      userRegister,
      userUpdate,
    } = supplie;
    return {
      idSupplie,
      nameSupplie,
      bName,
      clasificationName,
      sDateInitial,
      sDateUpdate,
      adress,
      products,
      catalog,
      edit,
      deleteIcon,
      history: [
        { emailSupplie, contactPhone, webPage, userRegister, userUpdate },
      ],
    };
  };

  const rows = supplies.map((supplie) => createData(supplie));

  const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    return (
      <>
        {row ? (
          <>
            <TableRow className={classes.root}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.nameSupplie}
              </TableCell>
              <TableCell align="center">{row.bName}</TableCell>
              <TableCell align="center">{row.clasificationName}</TableCell>
              <TableCell align="center">{row.sDateInitial}</TableCell>
              <TableCell align="center">{row.sDateUpdate}</TableCell>
              <TableCell align="center">{row.adress}</TableCell>
              <TableCell align="center">{row.products}</TableCell>
              <TableCell align="center">{row.catalog}</TableCell>            
              {user.FkRole === 1 || user.FkRole === 2 || user.FkRole === 999 ? (
                <TableCell align="center">{row.edit}</TableCell>
              ) : (
                <></>
              )}
              {user.FkRole === 1 || user.FkRole === 999 ? (
                <TableCell align="center">{row.deleteIcon}</TableCell>
              ) : (
                <></>
              )}
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={6}
              >
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                      Contacto Principal
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Correo</TableCell>
                          <TableCell>Telefono</TableCell>
                          <TableCell>Pagina Web</TableCell>
                          <TableCell>Usuario que registro</TableCell>
                          <TableCell>Ultimo usuario que Modifico</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.history.map((historyRow, index) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {historyRow.emailSupplie}
                            </TableCell>
                            <TableCell>{historyRow.contactPhone}</TableCell>
                            <TableCell>{historyRow.webPage}</TableCell>
                            <TableCell>{historyRow.userRegister}</TableCell>
                            <TableCell>{historyRow.userUpdate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  const headCells = [
    {
      id: "nameSupplie",
      label: "Nombre de Proveedor",
    },
    { id: "bName", label: "Tipo de Negocio" },
    { id: "clasificationName", label: "Clasificacion" },
    { id: "sDateInitial", label: "Fecha de Alta" },
    { id: "sDateUpdate", label: "Ultima Actualizacion" },
  ];

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

  supplies.forEach((element) => {
    let DateInital = element.sDateInitial.split("T");
    let DateUpdate = element.sDateUpdate.split("T");
    element.sDateInitial = DateInital[0];
    element.sDateUpdate = DateUpdate[0];
  });
  useEffect(() => {
    if (supplies) {
      getSupplies();
    }
  }, [flag, show]);

  const deleteSupplie = (e, id) => {
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
        Swal.fire({
          timer: 2000,
          timerProgressBar: true,
          title: "Borrado",
          text: "El proveedor fue borrado con exito",
          icon: "success",
        });
        try {
          axios.delete(`${SUPPLIE}/${id}`).then(() => {
            setFlag(!flag);
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          <TableCell />
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={"center"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell align="center">Domicilios</TableCell>
          <TableCell align="center">Productos</TableCell>
          <TableCell align="center">Catalogo</TableCell>
          {user.FkRole === 1 || user.FkRole === 2 || user.FkRole === 999 ? (
            <TableCell align="center">Editar</TableCell>
          ) : (
            <></>
          )}
          {user.FkRole === 1 || user.FkRole === 2 || user.FkRole === 999 ? (
            <TableCell align="right">Borrar</TableCell>
          ) : (
            <></>
          )}
        </TableRow>
      </TableHead>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="container-side p-0">
        <NavBar brand={props.brand}></NavBar>
        <div className="container px-3 pt-3">
          <EditSupplie
            show={show}
            handleClose={handleClose}
            supplie={supplieEdit}
          ></EditSupplie>
          <Form>
            <Form.Group as={Fila}>
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
          <h5 className="px-3">Mostrando {supplies.length} Resultados</h5>
          <div className="container">
            {supplies ? (
              <TableContainer component={Paper}>
                <EditSupplie
                  show={show}
                  handleClose={handleClose}
                  supplie={supplieEdit}
                  setFlag={setFlag}
                  flag={flag}
                ></EditSupplie>
                <Table aria-label="collapsible table">
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  ></EnhancedTableHead>
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy)).map(
                      (row, index) => (
                        <Row key={row.idSupplie} row={row} />
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
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
export default ShowSupplie;
