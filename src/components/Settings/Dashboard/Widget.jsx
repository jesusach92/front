import { Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import axios from "axios";
import { DTA } from "../../const/Const";
import { useEffect, useState } from "react";

const Widget = ({ type, dataAdmin }) => {
  let data;

 
  switch (type) {
    case "supplies":
      data = {
        title: "PROVEEDORES REGISTRADOS",
        counter: dataAdmin,
        link: "Ver Proveedores",
        to:"/proveedores",
        icon: (<AccountCircleIcon/>),
      };
      break;
      case 'contacts':
        data = {
          title: "CONTACTOS AGREGADOS",
          counter: dataAdmin,
          link: "Ver Contactos",
          to:"/proveedores",
          icon: (<ContactPhoneIcon/>),
        };
      break;
      case 'products':
        data = {
          title: "PRODUCTOS DISPONIBLES",
          counter: dataAdmin,
          link: "Ver Productos",
          to:"/productos",
          icon:(<ShoppingCartIcon/>),
        };  
        break;
    default:
      break;
  }
  return (
    <div className="widget">
      <span className="title">{data.title}</span>
      <span className="counter">{data.counter}</span>
      <span className="flex-widget">
        <span className="link"><Link to={data.to}>{data.link}</Link></span>
        <span className="iconWidget">{data.icon}</span>
      </span>
    </div>
  );
};
export default Widget;
