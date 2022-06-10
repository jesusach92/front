import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { USERS } from "../../const/Const";
import { UserContext } from "../../ContextUser/UserContext";
import NavBar from "../../Main/NavBar";
import SideBar from "../../Main/SideBar";
import AddUser from "./AddUser";
import UsersTable from "./UsersTable";
import Widget from "./Widget";

const DashboardAdmin = ({ brand }) => {
  const [flag, setFlag] = useState(false);
  const [dataAdmin, setDataAdmin] = useState({});
  const [state] = useContext(UserContext);
  const [user, setUser] = useState(null);
  const session = state.user;
  useEffect(() => {
    getdataAdmin();
  }, [session]);

  const getdataAdmin = async () => {
    try {
      const result = await axios.get(`${USERS}/DataAdmin`);
      setDataAdmin(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <SideBar></SideBar>
      <div className="container-side p-0">
        <NavBar brand={brand} />
        <div className="px-3 pt-5 widgets">
          <Widget type="supplies" dataAdmin={dataAdmin.Proveedores}></Widget>
          <Widget type="products" dataAdmin={dataAdmin.Productos}></Widget>
          <Widget type="contacts" dataAdmin={dataAdmin.Contactos}></Widget>
        </div>
        <div className="container px-3 pt-3 flex">
          <div className="px-3">
            <UsersTable flag={flag} setFlag={setFlag} setUser={setUser} />
          </div>
          <div className="px-3">
            <AddUser flag={flag} setFlag={setFlag} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
