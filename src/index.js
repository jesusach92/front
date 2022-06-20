import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SearchProduct from "./components/Main/SearchProduct";
import AddSupplie from "./components/Supplies/AddSupplie";
import Config from "./components/Settings/Config";
import ShowAdressSupplie from "./components/Main/ShowAdressSupple";
import ShowSupplieProduct from "./components/Main/ShowSupplieProduct";
import ShowProductsSupplie from "./components/Main/ShowProductsSupplie";
import Login from "./components/Main/Login";
import DashboardAdmin from "./components/Settings/Dashboard/DashboardAdmin";
import UserProvaider, {
  UserContext,
} from "./components/ContextUser/UserContext";
import ShowSupplie from "./components/Main/ShowSupplie";


const RoutesIndex = () => {
  const [state, ] = useContext(UserContext);
  const { user } = state;
  return (
    <>
      {user.tokenUser ? (
        <Router>
          <Routes>
            <Route
              path={"/Proveedores"}
              element={<ShowSupplie brand="Busqueda de Proveedores" />}
            ></Route>
            <Route
              path={"/Productos"}
              element={<SearchProduct brand="Busqueda de Productos" />}
            />
            {user.FkRole === 1 ||
            user.FkRole === 2 ||
            user.FkRole === 3 ||
            user.FkRole === 999 ? (
              <Route
                path={"/Agregar/Proveedor"}
                element={<AddSupplie brand="Agregar Proveedor" />}
              />
            ) : (
              <></>
            )}

            <Route
              path={"/Configuracion"}
              element={<Config brand="Configuracion" />}
            />
            <Route
              path={"/Domicilios/Proveedor/:id"}
              element={<ShowAdressSupplie brand="Domicilios Proveedor" />}
            />
            <Route
              path={"/productos/proveedores/:id"}
              element={
                <ShowSupplieProduct brand="Proveedores que cuentan con el producto" />
              }
            />
            <Route
              path={"/Proveedores/Productos/:id"}
              element={
                <ShowProductsSupplie brand="Productos que tiene un Proveedor" />
              }
            />
            <Route path={"/Inicio"} element={<Login brand="Inicio" />} />
            <Route path={"/"} element={<Login brand="Inicio" />} />
            {user.FkRole === 1 || user.FkRole === 999 ? (
              <Route
                path={"/Dashboard"}
                element={<DashboardAdmin brand="Administrar" />}
              />
            ) : (
              <></>
            )}
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path={"/Inicio"} element={<Login brand={"Inicio"} />} />
            <Route path={"/"} element={<Login brand={"Inicio"} />} />
            <Route
              path={"/login"}
              element={<Login brand={"Iniciar Sesión"} />}
            />
            <Route
              path={"*"}
              element={<Login brand={"Iniciar Sesión"}></Login>}
            ></Route>
          </Routes>
        </Router>
      )}
    </>
  );
};
const App = () => {
  return (
    <UserProvaider>
      <RoutesIndex></RoutesIndex>
    </UserProvaider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
