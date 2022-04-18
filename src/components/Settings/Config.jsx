import { Row } from "react-bootstrap";
import NavBar from "../Main/NavBar";
import BusinessType from "./BusinessType";
import SClasification from "./SClasification";
import Technologies from "./Technologies";
import TypeAdress from "./TypeAdress";

const Config = (props) => {
  return (
    <div className="container-side p-0">
      <NavBar brand={props.brand} />
      <div className="container border mt-5 p-3">
        <h5>
          Este apartado de configuracion es para agregar campos importantes de
          uso, tipos de negocio, clasificacion de proveedores, tipos de
          domicilio, entre otros.
        </h5>
      </div>
      <div className="container mt-5">
        <Row>
          <BusinessType />
          <SClasification />
        </Row>
        <Row className="mt-3">
          <Technologies />
          <TypeAdress />
        </Row>
      </div>
    </div>
  );
};

export default Config;
