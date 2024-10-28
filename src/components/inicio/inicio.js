import './inicio.css'
import Producto from '../producto/Producto';

import { useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from '../../redux/states/ProductReducer';
import { setIsProductSelected } from '../../redux/states/ProductReducer';
import LandingPage from './LandingPage';
import Footer from './footer';
import Ofertas from '../producto/Ofertas';
import Categorias from '../Categoria/Categorias';
const Inicio = () =>{
     const dispatch = useDispatch();
     const {
        products
    } = useSelector((store) => store);

    const { productos, isProductSelected } = products
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() =>{
        const fetchProductos = async () => {
            try {
              const response = await fetch(`${apiUrl}productos/`);
              const data = await response.json();
              dispatch(setProducts(data))
            } catch (error) {
              console.error('Error al obtener los productos:', error);
            }
          };
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
        <LandingPage/>
        <p className='ofertas'>OFERTAS</p>
        <Ofertas/>
        <p className='ofertas'>CATEGORÍAS</p>
        <Categorias/>
        </>
    )
}

export default Inicio;