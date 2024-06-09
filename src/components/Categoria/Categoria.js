import { useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from '../../redux/states/ProductReducer';
import { setIsProductSelected } from '../../redux/states/ProductReducer';
import Producto from '../producto/Producto';

const Categoria = ({id, categoria}) =>{
    const dispatch = useDispatch();
    const {
       products
   } = useSelector((store) => store);
    const { productos, isProductSelected } = products


    return(
        <>
        <Container>
          <ProductContainer>
            {productos.map(producto => (
              <Producto
                key={producto.id}
                id={producto.id}
                nombre={producto.nombre}
                precio={producto.precio}
                imagen={producto.imagen}
                categoria={producto.categoria_nombre}
              />
            ))}
          </ProductContainer>
        </Container>
        </>
    )
}

export default Categoria;


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