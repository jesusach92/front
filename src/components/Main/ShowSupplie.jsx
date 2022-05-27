import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Link } from 'react-router-dom';
import BusinessIcon from "@material-ui/icons/Business";
import StorefrontIcon from "@material-ui/icons/Storefront";
import EditIcon from "@material-ui/icons/Edit";
import Swal from 'sweetalert2';
import axios from 'axios';
import { DSF, SBF } from '../const/Const';
import EditSupplie from '../Supplies/EditSupplie';
import { UserContext } from '../ContextUser/UserContext';
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from './SideBar';
import NavBar from './NavBar';
import { Button, Col, Form, Row as Fila } from 'react-bootstrap';




 const ShowSupplie =(props)=> {
    const [state] = useContext(UserContext);
    const user = state.user;
    const [supplies, setSupplies] = useState([]);
    const [tabSupplies, setTabSupplies] = useState([]);
    const [supplieEdit, setSupplieEdit] = useState({})
    const [search, setSearch] = useState("");
    const [flag, setFlag] = useState(false);
    const [show, setshow] = useState(false);
    const handleClose = () =>{
      setshow(false);
    }
    const useRowStyles = makeStyles({
        root: {
          '& > *': {
            borderBottom: 'unset',
          },
        },
      });
      useEffect(() => {
        getSupplies();
    }, []);

    const getSupplies = async () => {
      const result = await axios.get(SBF);
      setSupplies(result.data);
      setTabSupplies(result.data);
    };
      const createData =(supplie) => {
       const adress = (
          <Link to={`/Domicilios/Proveedor/${supplie.idSupplie}`}>
          <IconButton style={{ color: "#fa5d02" }}>
            <BusinessIcon></BusinessIcon>
          </IconButton>
        </Link>
       )
       const products = (
          <Link
          to={`/Proveedores/Productos/${supplie.idSupplie}`}
        >
          <IconButton
            style={{ color: "rgba(6, 10, 71, 0.91)" }}
          >
            <StorefrontIcon></StorefrontIcon>
          </IconButton>
        </Link>
      )
      const edit = (
          <IconButton onClick={e=> {setshow(true); setSupplieEdit(supplie)}}>
          <EditIcon color="primary" ></EditIcon>
        </IconButton>
      )
      const deleteIcon = (
        <IconButton
        color="secondary"
        onClick={(e) =>
          deleteSupplie(e, supplie.idSupplie)
        }
      >
        <DeleteIcon></DeleteIcon>
      </IconButton>
      ) 
       const {idSupplie, nameSupplie, bName , clasificationName, sDateInitial, sDateUpdate, emailSupplie, contactPhone} = supplie;
       return {
        idSupplie,
        nameSupplie,
        bName,
        clasificationName,
        sDateInitial,
        sDateUpdate,
        adress,
        products,
        edit,
        deleteIcon,
        history: [
            {  emailSupplie, contactPhone },
          ],
        };
      }

      const rows = supplies.map((supplie)=>createData(supplie))
      const Row =(props)=>{
        const { row } = props;
        const [open, setOpen] = useState(false);
        const classes = useRowStyles();
        
        return (
          <>
          
          {row ? (<><TableRow  className={classes.root}>
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.nameSupplie}
              </TableCell>
              <TableCell align="right">{row.bName}</TableCell>
              <TableCell align="right">{row.clasificationName}</TableCell>
              <TableCell align="right">{row.sDateInitial}</TableCell>
              <TableCell align='right'>{row.sDateUpdate}</TableCell>
              <TableCell align='right'>{row.adress}</TableCell>
              <TableCell align='right'>{row.products}</TableCell>
              {user.FkRole === 1 ||
                user.FkRole === 2 ||
                user.FkRole === 999 ?(
              <TableCell align='right'>{row.edit}</TableCell>
              ):(<></>)}
              {user.FkRole === 1 ||
                user.FkRole === 999 ? (
              <TableCell align='right'>{row.deleteIcon}</TableCell>
              ):(
                <></>
              )}
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.history.map((historyRow, index) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {historyRow.emailSupplie}
                            </TableCell>
                            <TableCell>{historyRow.contactPhone}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow></>):(<></>)}
            
          </>
        );
      }
      
  
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
            axios.delete(`${DSF}/${id}`).then(() => {
              setFlag(!flag);
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    };
    
  return (
    <div className="flex">
      <SideBar />
      <div className="container-side p-0">
        <NavBar brand={props.brand}></NavBar>
        <div className="container px-3 pt-3">
        <EditSupplie show={show} handleClose={handleClose} supplie={supplieEdit}></EditSupplie>
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
          <h5 className='px-3'>Mostrando {supplies.length} Resultados</h5>
          <div className="container">
            {supplies ? (
    <TableContainer component={Paper}>
        <EditSupplie show={show} handleClose={handleClose} supplie={supplieEdit} setFlag={setFlag} flag={flag}></EditSupplie>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nombre de Proveedor</TableCell>
            <TableCell align="right">Tipo de Negocio</TableCell>
            <TableCell align="right">Clasificacion</TableCell>
            <TableCell align="right">Fecha de Alta</TableCell>
            <TableCell align="right">Ultima Actualizacion</TableCell>
            <TableCell align="right">Domicilios</TableCell>
            <TableCell align="right">Productos</TableCell>
            {user.FkRole === 1 ||
                user.FkRole === 2 ||
                user.FkRole === 999 ?(
            <TableCell align="right">Editar</TableCell>
            ):(<></>)}
             {user.FkRole === 1 ||
                user.FkRole === 2 ||
                user.FkRole === 999 ?(
            <TableCell align="right">Borrar</TableCell>
            ):(<></>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.idSupplie} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ): (
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