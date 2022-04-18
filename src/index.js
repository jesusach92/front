import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/Main/SideBar";
import SearchSupplie from "./components/Main/SearchSupplie";
import SearchProduct from "./components/Main/SearchProduct";
import AddSupplie from "./components/Supplies/AddSupplie";
import Config from "./components/Settings/Config";
import ShowAdressSupplie from "./components/Main/ShowAdressSupple";
import ShowSupplieProduct from "./components/Main/ShowSupplieProduct";
import ShowProductsSupplie from "./components/Main/ShowProductsSupplie";
import Home from "./components/Main/Home";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar />
        <Routes>
          <Route
            path={"/Proveedores"}
            element={<SearchSupplie brand="Busqueda de Proveedores" />}
          />
          <Route
            path={"/Productos"}
            element={<SearchProduct brand="Busqueda de Productos" />}
          />
          <Route
            path={"/Agregar/Proveedor"}
            element={<AddSupplie brand="Agregar Proveedor" />}
          />
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
          <Route path={"/Inicio"} element={<Home />} />
          <Route path={"/"} element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
