import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
const TotalCarrito = ({subtotal, total, setTotal}) =>{
    const { cartproducts } = useSelector((store) => store)
    const { productsCart, subTotal } = cartproducts;

    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const navigate = useNavigate();
    // const [total, setTotal] = useState(subtotal)

    const handleChange = (event) => {
        const valorSeleccionado = event.target.value;
        setOpcionSeleccionada(valorSeleccionado);
        let newTotal = 0

        if(valorSeleccionado === "gye"){
            newTotal = Number(subtotal) + 3
        }
        else if(valorSeleccionado === "res"){
            newTotal = Number(subtotal) + 5
        }
        else{
            newTotal= Number(subtotal)
        }
        setTotal(newTotal.toFixed(2))

    };

    const handleFinalizar = () =>{
        navigate('/facturacion')
    }

    return(
        <Container>
        <Title>TOTAL DEL CARRITO</Title>
        
        <Campo>
          <Label>Subtotal</Label>
          <Value>${subtotal}</Value>
        </Campo>
        
        <Divider />
        
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <RadioOption>
            <RadioInput
              type="radio"
              id="rec"
              name="group"
              value="rec"
              onChange={handleChange}
              checked={opcionSeleccionada === 'rec'}
            />
            <RadioLabel htmlFor="rec">Recoger pedido</RadioLabel>
          </RadioOption>
          <Address>Villa Club Cosmos, Mz 5 v 23</Address>
  
          <Campo style={{ marginTop: '20px' }}>
            <Label>Envío</Label>
            <SmallText>
              Las compras a partir de las <br /> 10pm se envían al día siguiente
            </SmallText>
          </Campo>
  
          <RadioOption>
            <RadioInput
              type="radio"
              id="gye"
              name="group"
              value="gye"
              onChange={handleChange}
              checked={opcionSeleccionada === 'gye'}
            />
            <RadioLabel htmlFor="gye">Guayaquil: $3.00</RadioLabel>
          </RadioOption>
  
          <RadioOption>
            <RadioInput
              type="radio"
              id="res"
              name="group"
              value="res"
              onChange={handleChange}
              checked={opcionSeleccionada === 'res'}
            />
            <RadioLabel htmlFor="res">Resto del país: $5.00</RadioLabel>
          </RadioOption>
        </fieldset>
  
        <Divider />
  
        <Campo>
          <Label>Total</Label>
          <Value>${total}</Value>
        </Campo>
  
        <Button onClick={handleFinalizar}>
          Finalizar compra
        </Button>
      </Container>
    )

}

export default TotalCarrito;

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 1rem 0;
`;

const Campo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Label = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
`;

const Value = styled.p`
  font-size: 1.125rem;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const RadioInput = styled.input`
  margin-right: 0.5rem;
`;

const RadioLabel = styled.label`
  font-size: 1rem;
`;

const Address = styled.p`
  font-size: 0.875rem;
  margin-left: 1.5rem;
  margin-bottom: 0.5rem;
`;

const SmallText = styled.p`
  font-size: 0.75rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;