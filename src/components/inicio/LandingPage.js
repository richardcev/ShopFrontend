import supermercado from '../../assets/images/super.jpg'
import styled from 'styled-components';
import { useDispatch } from "react-redux";


const LandingPage = () =>{
  const dispatch = useDispatch();


    return(
        <Container>
            <img src={supermercado} alt="Supermercado"/>
        </Container>

    )
}

export default LandingPage;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh; /* Establece la altura deseada (ejemplo: 50% de la altura de la ventana gráfica) */
  overflow: hidden; /* Evita que la imagen se desborde si la ventana gráfica es más pequeña */

  img {
    width: 100%; /* Ocupa todo el ancho de su contenedor */
    height: auto; /* Se ajusta automáticamente para mantener la proporción */
  }
`;