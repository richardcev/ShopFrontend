import React, { useRef, useState } from 'react';
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

    const [cardWidth, setCardWidth] = useState(0);

    useEffect(() => {
      const updateCardWidth = () => {
        const firstCard = carouselRef.current.firstChild;
        if (firstCard) {
          const gapPercentage = parseFloat(getComputedStyle(carouselRef.current).gap);
          const containerWidth = carouselRef.current.clientWidth;
          const gap = (gapPercentage / 100) * containerWidth; 
          const totalWidth = firstCard.clientWidth + gap;
          setCardWidth(totalWidth);
        }
      };
  
      // Actualizamos el ancho del card al cargar y al redimensionar la ventana
      window.addEventListener('resize', updateCardWidth);
      updateCardWidth();
  
      return () => {
        window.removeEventListener('resize', updateCardWidth);
      };
    }, []);



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
      left: -cardWidth,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className='mainContainer'>
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