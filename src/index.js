import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import './index.css'
import SideBar from './components/SideBar'
import SearchSupplie from './components/SearchSupplie'
import SearchProduct from './components/SearchProduct'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ShowSupplieProduct from './components/ShowSupplieProduct'
import ShowAdressSupplie from './components/ShowAdressSupple';
import ShowProductsSupplie from './components/ShowProductsSupplie';
import Home from './components/Home';
import  AddSupplie  from './components/Supplies/AddSupplie';
import Config  from './components/Settings/Config.js';

const App = () => {



  return(
  <BrowserRouter>
  <div className="flex">
  <SideBar /> 
    <Routes>
      <Route path={"/Proveedores"} element={<SearchSupplie brand="Busqueda de Proveedores" />} />
      <Route path={"/Productos"} element={<SearchProduct brand="Busqueda de Productos" />} />
      <Route path={"/Agregar/Proveedor"} element={<AddSupplie brand="Agregar Proveedor" />} />
      <Route path={"/Configuracion"} element={<Config brand="Configuracion" />} />
      <Route path={"/Domicilios/Proveedor/:id"} element={<ShowAdressSupplie brand="Domicilios Proveedor"/>} />
      <Route path={"/productos/proveedores/:id"} element={<ShowSupplieProduct brand="Proveedores que cuentan con el producto"/>}/>
      <Route path={"/Proveedores/Productos/:id"} element={<ShowProductsSupplie brand="Productos que tiene un Proveedor"/>}/>
      <Route path={'/Inicio'} element={<Home></Home>}/>
      <Route path={'/'} element={<Home></Home>}/>
      
    </Routes>
    </div>
  </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

