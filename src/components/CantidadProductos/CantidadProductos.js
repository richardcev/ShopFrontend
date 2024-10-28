import styled from "styled-components";
const CantidadProductos = ({cantidad, handleDecrement, handleIncrement, handleInputChange}) => {
    return(
        <Select>
            <ButtonSelect onClick={handleDecrement}>-</ButtonSelect>
            <Input
            type="text"
            value={cantidad}
            onChange={handleInputChange}
            />
            <ButtonSelect onClick={handleIncrement}>+</ButtonSelect>
        </Select>
    )
}


export default CantidadProductos;

const Select = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonSelect= styled.button`
border: 1px solid #e0e0e0;
padding: 1px 15px;
font-size: 20px;
font-weight: bold;
cursor: pointer;
`

const Input = styled.input`
width: 60px;
text-align: center;
font-size: 20px;
color: #007BFF;
padding: 1px 15px;
border-top: 1px solid #e0e0e0;    /* Borde superior */
border-bottom: 1px solid #e0e0e0; /* Borde inferior */
border-left: none;                /* Sin borde en los lados izquierdo y derecho */
border-right: none;
`