import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import './index.css'
import SideBar from './components/SideBar'
import SearchSupplie from './components/SearchSupplie'
import SearchProduct from './components/SearchProduct'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ShowAdressContact from './components/ShowAdressContact'
import ShowSupplieProduct from './components/ShowSupplieProduct'

const App = () => {
  return(
  <BrowserRouter>
  <div className="flex">
  <SideBar /> 
    <Routes>
      <Route path={"/Proveedores"} element={<SearchSupplie brand="Busqueda de Proveedores" />} />
      <Route path={"/Productos"} element={<SearchProduct brand="Busqueda de Productos" />} />
      <Route path={"/Agregar/Proveedor"} element={<SearchSupplie brand="Agregar Proveedor" />} />
      <Route path={"/Agregar/Producto"} element={<SearchSupplie brand="Agregar Producto" />} />
      <Route path={"/Configuracion"} element={<SearchSupplie brand="Configuracion" />} />
      <Route path={"/Domicilios/Proveedor/:id"} element={<ShowAdressContact brand="Domicilios Proveedor"/>} />
      <Route path={"/productos/proveedores/:id"} element={<ShowSupplieProduct brand="Proveedores que cuentan con el producto"/>}/>
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

