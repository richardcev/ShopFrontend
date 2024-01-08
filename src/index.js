import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Header from './components/header/Header'
import Productos from './components/producto/Producto'
import Login from './components/usuarios/Login'
import DetalleProducto from './components/DetalleProducto/DetalleProducto'
import Inicio from './components/inicio/inicio'
import Carrito from './components/Carrito/Carrito'
import "./index.css"
import InputProducto from './components/inicio/inputProducto'
import AppFooter from './components/inicio/footer'
import { Provider } from "react-redux";
import generateStore from "./redux";
import { PersistGate } from 'redux-persist/integration/react'
import ResponsiveAppBar from './components/header/Navbar'

const { store, persistor } = generateStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <ResponsiveAppBar/>
      
        <Routes>
          <Route path='/' element={ <Inicio />}></Route>
          <Route path='/login' element= {<Login />}></Route>
          <Route path='/cart' element= {<Carrito />}></Route>
          <Route path="/producto/:id" element={<DetalleProducto />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  </React.StrictMode>

)