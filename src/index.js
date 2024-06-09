import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Productos from './components/producto/Producto'
import Login from './components/usuarios/Login'
import DetalleProducto from './components/DetalleProducto/DetalleProducto'
import Inicio from './components/inicio/inicio'
import Carrito from './components/Carrito/Carrito'
import Facturacion from './components/Compra/facturacion'
import "./index.css"
import AppFooter from './components/inicio/footer'
import { Provider } from "react-redux";
import generateStore from "./redux";
import { PersistGate } from 'redux-persist/integration/react'
import HeaderCustom from './components/header/HeaderCustom'
import Categoria from './components/Categoria/Categoria'

const { store, persistor } = generateStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <HeaderCustom/>
      
        <Routes>
          <Route path='/' element={ <Inicio />}></Route>
          <Route path='/cuenta/login' element= {<Login />}></Route>
          <Route path='/cart' element= {<Carrito />}></Route>
          <Route path='/facturacion' element= {<Facturacion />}></Route>
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/categoria/:id/:categoria" element={<Categoria />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  </React.StrictMode>

)