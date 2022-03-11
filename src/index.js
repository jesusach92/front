import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import './index.css';
import SideBar from './components/SideBar'
import ViewContent from './components/ViewContent'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

const App = () => {
  return(
  <BrowserRouter>
  <div className="flex">
  <SideBar /> 
    <Routes>
      <Route path={"/Proveedores"} element={<ViewContent brand="Busqueda de Proveedores" id={1} />} />
      <Route path={"/Productos"} element={<ViewContent brand="Busqueda de Producto"  />} />
      <Route path={"/Agregar/Proveedor"} element={<ViewContent brand="Agregar Proveedor" />} />
      <Route path={"/Agregar/Producto"} element={<ViewContent brand="Agregar Producto" />} />
      <Route path={"/Configuracion"} element={<ViewContent brand="Configuracion" />} />
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

