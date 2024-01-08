import './inicio.css'
import Producto from '../producto/Producto';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useContext } from 'react';
import InputProducto from './inputProducto';
import LandingPage from './LandingPage';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from '../../redux/states/ProductReducer';
import { setIsProductSelected } from '../../redux/states/ProductReducer';
import CustomizedInputBase from './searchProduct';
const Inicio = () =>{
     const dispatch = useDispatch();
     const {
        products
    } = useSelector((store) => store);

    const { productos, isProductSelected } = products

    useEffect(() =>{
        const fetchProductos = async () => {
            try {
              const response = await fetch('http://18.232.56.56/productos/');
              const data = await response.json();
              dispatch(setProducts(data.productos))
            } catch (error) {
              console.error('Error al obtener los productos:', error);
            }
          };
        console.log("el producto esta seleccionado ?")
        console.log(isProductSelected)
        // Verifico si dan click en inicio después de haber visitado un detalle de producto
        if(!isProductSelected){
          fetchProductos()
        }
        else{
          dispatch(setIsProductSelected(false))
        }
    },[])

    return(
        <>
        {/* <LandingPage/> */}
        <CustomizedInputBase/>
        <Container>
          <ProductContainer>
            {productos.map(producto => (
              <Producto
                key={producto.id}
                id={producto.id}
                nombre={producto.nombre}
                precio={producto.precio}
                imagen={producto.imagen}
                categoria={producto.categoria}
              />
            ))}
          </ProductContainer>
        </Container>
        </>
    )
}

export default Inicio;

const Container = styled.div`
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  width: 100%;
`;


const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Crea 4 columnas con igual ancho */
  gap: 16px; /* Espacio entre productos */
  max-width: 1200px; /* Ancho máximo del contenedor de productos */
  width: 100%; /* Ocupa todo el ancho disponible */
  padding: 0 16px; /* Espaciado horizontal en los bordes */

  /* Centra el contenido horizontalmente dentro del contenedor */
  margin: 0 auto;

  @media (max-width: 767px) {
    /* Cambia a una sola columna en pantallas más pequeñas */
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;