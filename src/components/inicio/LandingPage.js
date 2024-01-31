import supermercado from '../../assets/images/super.jpg'
import logo from '../../assets/images/LOGOMATT.png'
import styled from 'styled-components';
import { useDispatch } from "react-redux";


const LandingPage = () =>{
  const dispatch = useDispatch();


    return(
      <Container>
        <img src={logo} alt="Supermercado" width={"20%"}/>
      </Container>
        

    )
}

export default LandingPage;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 20vh;
  overflow: hidden; 

  img {
    width: 100%; 
    height: auto; 
  } */
`;