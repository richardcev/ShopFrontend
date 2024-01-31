import { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { useSelector } from "react-redux";
const TotalCarrito = ({subtotal}) =>{
    const { cartproducts } = useSelector((store) => store)
    const { productsCart, subTotal } = cartproducts;

    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [total, setTotal] = useState(subtotal)

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
            newTotal= subtotal
        }
        setTotal(newTotal)

      };

    return(
        <Container>
            <h4 style={{marginLeft: "120px"}}>TOTAL DEL CARRITO</h4>
            <Campo>
            <p><b>Subtotal</b></p>
            <p>${subtotal}</p>
            </Campo>
            <TopLine/>
            <fieldset id = "group">
            <Radio>
                <label htmlFor="rec">Recoger pedido</label>
                <input type="radio" id="rec" name="group" value="rec" onChange={handleChange} checked={opcionSeleccionada === 'rec'}/>
                <p>Villa Club Cosmos, Mz 5 v 23</p>
            </Radio>

            <Campo>
            <p style={{marginLeft: "25px"}}><b>Envío</b></p>
            <p style={{fontSize: "11px"}}>Las compras a partir de las <br/> 10pm  se envían al día siguiente</p>
            </Campo>

            

            <Radio>
                <label htmlFor="gye">Guayaquil: $3.00</label>
                <input type="radio" id="gye" name="group" value="gye" onChange={handleChange} checked={opcionSeleccionada === 'gye'}/>
            </Radio>

            <Radio>
                <label htmlFor="res">Resto del país: $5.00</label>
                <input type="radio" id="res" name="group" value="res" onChange={handleChange} checked={opcionSeleccionada === 'res'} />
            </Radio>
            </fieldset>

            
            <TopLine/>

            <Campo>
            <p><b>Total</b></p>
            <p>${total}</p>
            </Campo>
            <FinalizarButton
             type='primary' 
             size='large'
             >
            Finalizar compra
            </FinalizarButton>



        </Container>
    )

}

export default TotalCarrito;

const Container = styled.div`

`

const TopLine = styled.div`
  width: 65%;
  height: 1px;
  background-color: #ccc;
  margin-left: 120px;
`;

const Campo = styled.div`
margin-top: 20px;
display: flex;
justify-content: space-around;
`

const Radio = styled.div`
margin-left: 120px;
margin-top: 20px;
`

const FinalizarButton= styled(Button)`
  background-color: #030201;
  border-color: #030201;
  margin-top: 15px;
  margin-left: 120px;
  width: 65%;

`