import React, { useRef } from 'react';
import './Ofertas.css';
import Producto from './Producto';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { setProducts } from '../../redux/states/ProductReducer';
import { setIsProductSelected } from '../../redux/states/ProductReducer';

const Ofertas = () => {
  
  const carouselRef = useRef(null);
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
            for(let prod of data){
                console.log(prod.destacado)
            }
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

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -carouselRef.current.clientWidth,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: carouselRef.current.clientWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className="carousel-container" style={{marginTop: "30px"}}>
      <button className="carousel-button left" onClick={scrollLeft}>‹</button>
      <div className="carousel" ref={carouselRef}>
        {productos.map(producto => 
                producto.destacado && (
                    <Producto
                    key={producto.id}
                    id={producto.id}
                    nombre={producto.nombre}
                    precio={producto.precio}
                    imagen={producto.imagen}
                    categoria={producto.categoria_nombre}
                  />
                )
        )}
      </div>
      <button className="carousel-button right" onClick={scrollRight}>›</button>
    </div>
  );
};

export default Ofertas;