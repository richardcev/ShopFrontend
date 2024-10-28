import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteProduct, setSubTotal } from "../../redux/states/CartReducer";
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useEffect, useState } from "react";
import { updateProduct } from "../../redux/states/CartReducer";
import TotalCarrito from "./TotalCarrito";
import './Carrito.css'
import { Container, Row, Col } from 'react-bootstrap';
import CantidadProductos from "../CantidadProductos/CantidadProductos";

const Carrito = () =>{
    const { cartproducts } = useSelector((store) => store)
    const { productsCart, subTotal } = cartproducts;
    const [totalScreen, setTotalScreen] = useState(subTotal)
    const dispatch= useDispatch();


    useEffect(() =>{
      console.log("SUBTOTAL")
      console.log(subTotal)
      // dispatch(setSubTotal(0))
    },[productsCart])

    const handleRemoveProduct = (productid) =>{
        let deletedProduct= {}
        for(let product of productsCart){
            if(product.id== productid){
                deletedProduct= product
            }
        }
        let subtotal = Number(subTotal) - Number(deletedProduct.total)
        let newTotal = Number(totalScreen) - Number(deletedProduct.total)
        dispatch(setSubTotal(subtotal.toFixed(2)))
        dispatch(deleteProduct(deletedProduct))
        setTotalScreen(newTotal.toFixed(2))
    }

    const calculateNewTotal = (updatedProduct) =>{
      let total = updatedProduct.cantidad * updatedProduct.precio
      let subtotal = (Number(subTotal) - Number(updatedProduct.total) + total )
      let newTotal = (Number(totalScreen) - Number(updatedProduct.total) + total )
      updatedProduct.total=  total.toFixed(2)
      dispatch(setSubTotal(subtotal.toFixed(2)))
      dispatch(updateProduct(updatedProduct))
      setTotalScreen(newTotal.toFixed(2))

    }

    const handleInputChange = (e, product) => {
      // Verificamos si el valor ingresado es un número positivo o si está vacío (borrado).
      const value = e.target.value;
      if (/^\d*$/.test(value) && (value === "" || parseInt(value) >= 1)) {
        // Si es válido o está vacío, establecer la cantidad como un número entero.
        let updatedProduct = product
        updatedProduct.cantidad = value === "" ? "" : parseInt(value)
        calculateNewTotal(updatedProduct)
      } 
    };

    const handleIncrement = (product) => {
      let updatedProduct = product
      updatedProduct.cantidad = product.cantidad + 1
      calculateNewTotal(updatedProduct)
    };
  
    const handleDecrement = (product) => {
      if (product.cantidad > 1){
        let updatedProduct = product
        updatedProduct.cantidad = product.cantidad - 1
        calculateNewTotal(updatedProduct)
      }
    };


    return(
      <Container className="principal">
        <Row>
          <Col xs={7} >
          {
            productsCart.map((product) =>(
              <>
              <TopLine/>
              <Row key={product.id}>
                <Col xs={4}>
                  <Imagen src={product.imagen}/>
                </Col>
                <Col xs={6} style={{marginTop:"20px"}}>
                  <p className="nombreProducto">{product.nombre}</p>
                  <Opciones>
                    <CantidadProductos
                      cantidad={product.cantidad} 
                      handleDecrement={() => handleDecrement(product)} 
                      handleIncrement={() => handleIncrement(product)}
                      handleInputChange={(e) => handleInputChange(e, product)}
                    />
                    <RemoveButton onClick={() => handleRemoveProduct(product.id)}>
                          Eliminar
                    </RemoveButton>
                  </Opciones>
                </Col>
                <Col xs={2} style={{marginTop:"18px"}}>
                  <p className="precio">${product.precio}</p>
                </Col>
              </Row>
              </>
            ))
          }
            <TopLine/>
          </Col>
          <Col xs={5} >
            <TotalCarrito subtotal={subTotal} total={totalScreen} setTotal={setTotalScreen}/>
          </Col>
        </Row>
      </Container>
    )
}
export default Carrito;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  margin-left: 18px;
  cursor: pointer;
  color: #1976D2; 
`;


const Opciones = styled.div`
  margin-top: 50px;
  display: flex;
`

const Imagen = styled.img`
  width: 150px;
  height: 150px;
`;

const TopLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
`;