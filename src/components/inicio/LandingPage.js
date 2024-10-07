import supermercado from '../../assets/images/super.jpg'
import logo from '../../assets/images/BANNER.png'
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import HeroSection from './HeroSection';


const LandingPage = () =>{
  const dispatch = useDispatch();


    return(
      <HeroSection/>
      // <Container>
      //   <img src={logo} alt="Supermercado" width={"90%"} style={{marginTop: "20px"}}/>
      // </Container>
        

    )
}

export default LandingPage;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px; /* Ancho máximo del contenedor de productos */
  width: 100%; 
  margin-top: 20px;


  margin: 0 auto;
  /* height: 20vh;
  overflow: hidden; 

  img {
    width: 100%; 
    height: auto; 
  } */
`;