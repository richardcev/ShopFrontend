import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteProduct, setSubTotal } from "../../redux/states/CartReducer";
import { Select, Space } from 'antd';
import { Button } from 'antd';
import { useEffect, useState } from "react";
import { updateProduct } from "../../redux/states/CartReducer";
import TotalCarrito from "./TotalCarrito";





const Carrito = () =>{
    const { cartproducts } = useSelector((store) => store)
    const { productsCart, subTotal } = cartproducts;
    const dispatch= useDispatch();

    const [cantidad, setCantidad] = useState(1);
    const numeros = Array.from({ length: 50 }, (_, index) => index + 1);
    const { Option } = Select;


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
        dispatch(setSubTotal(subtotal.toFixed(2)))
        dispatch(deleteProduct(deletedProduct))
    }

    const handleSelect= (e, product) =>{
      const value = e
      setCantidad(value)
      let updatedProduct = product
      updatedProduct.cantidad = value
      let total = value * updatedProduct.precio
      let subtotal = (Number(subTotal) - Number(updatedProduct.total) + total )
      updatedProduct.total=  total.toFixed(2)
      dispatch(setSubTotal(subtotal.toFixed(2)))
      dispatch(updateProduct(updatedProduct))
    }

    return(

      < ParentContainer>
        <Container>
        {
            productsCart.map((product) =>(
              <>
              <TopLine/>
              <Product key={product.id}>
                <div>
                <Imagen src={product.imagen}/>
                </div>
                <div style={{marginTop:"20px"}}>
                  <h5>{product.nombre}</h5>
                  <Opciones>
                    <p style={{fontSize: "18px"}}>Cantidad</p>
                    <Select defaultValue={product.cantidad} onChange={(selectedValue) => handleSelect(selectedValue, product)}>
                      {numeros.map((numero) => (
                        <Option key={numero} value={numero}>
                          {numero}
                        </Option>
                      ))}
                    </Select>


                    <RemoveButton onClick={() => handleRemoveProduct(product.id)}>
                          Eliminar
                    </RemoveButton>
                  </Opciones>

                </div>
                <div style={{marginTop:"18px"}}>
                <Precio>${product.precio}</Precio>
                </div>
              </Product>
              </>
            ))
        }

          <TopLine/>

        



        </Container>

        <TotalCarrito subtotal={subTotal}/>

        </ParentContainer>
    )
}


export default Carrito;


const ParentContainer= styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
margin-left: 10%;
margin-right: 10%;
margin-top: 3%;
`

const Container = styled.div`
  
  margin-top: 3%;
  background-color: #FFFFFF

`;


const Product = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 3%;
  margin-top: 3px;
  width: 40%;

`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;


const Opciones = styled.div`
  margin-top: 50px;
  display: flex;
`

const Imagen = styled.img`
  width: 150px;
  height: 150px;
`;

const Precio= styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-left: 120px;
`

const TopLine = styled.div`
  width: 90%;
  height: 1px;
  background-color: #ccc;
`;