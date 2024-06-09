import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setIsProductSelected } from '../../redux/states/ProductReducer';
import { useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/states/CartReducer';
import { useNavigate } from 'react-router-dom';
import { setSubTotal } from '../../redux/states/CartReducer';

const DetalleProducto = () => {
    const dispatch = useDispatch();
    const params = useParams()
    const { cartproducts } = useSelector((store) => store)
    const { productsCart, subTotal } = cartproducts
    const [producto, setProducto] = useState([])
    const [cantidad, setCantidad] = useState(1);

    const handleIncrement = () => {
      
      setCantidad(cantidad + 1);
    };
  
    const handleDecrement = () => {
      if (cantidad > 1) {
        setCantidad(cantidad - 1);
      }
    };

    const handleInputChange = (e) => {
      // Verificamos si el valor ingresado es un número positivo o si está vacío (borrado).
      const value = e.target.value;
      if (/^\d*$/.test(value) && (value === "" || parseInt(value) >= 1)) {
        // Si es válido o está vacío, establecer la cantidad como un número entero.
        setCantidad(value === "" ? "" : parseInt(value));
      } 
    };

    const navigate = useNavigate();
    useEffect(() =>{
      console.log("entro a detalle producto")
      dispatch(setIsProductSelected(true))
      fetch(`http://127.0.0.1:8000/productos/?id=${params.id}`)
      .then(response => response.json())
      .then(data =>{
        console.log("detalleproducto")
        console.log(data)
        let producto = data[0]
        producto.cantidad = 1
        setProducto(producto)
      })
      .catch(err => console.error(err))
    }, [])

    const addProductCard = () =>{
      const productexist = productsCart.some((product) => product.id == producto.id)
      if(productexist){
        let productArray = productsCart.filter((product) => product.id == producto.id)
        let product = productArray[0]
        let newCantidad = product.cantidad + cantidad 
        let newTotal =  newCantidad * producto.precio
        let subtotal = newTotal + Number(subTotal) - Number(product.total)
        product.cantidad = newCantidad
        product.total = newTotal.toFixed(2)
        dispatch(setSubTotal(subtotal.toFixed(2)))
        dispatch(updateProduct(product))
      }
      else{
        let total = cantidad * parseFloat(producto.precio)
        let subtotal= total + Number(subTotal)
        dispatch(setSubTotal(subtotal.toFixed(2)))
        producto.total= total.toFixed(2)
        producto.cantidad= cantidad
        dispatch(addProduct(producto))
      }
      navigate('/cart')
    }
    
    return (
      <>
        <Container>
          <div>
            <p style={{fontSize: '30px', fontWeight: 'bold'}}>{producto.nombre}</p>
            <div>
              <Imagen src={producto.imagen}/>
            </div>
            <p style={{marginBottom: '20px', fontSize: '30px', fontWeight: 'bold'}}>${producto.precio}</p>
            <Select>
              <ButtonSelect onClick={handleDecrement}>-</ButtonSelect>
              <Input
                type="text"
                value={cantidad}
                style={{width:"100px"}}
                onChange={handleInputChange}
              />
              <ButtonSelect onClick={handleIncrement}>+</ButtonSelect>
            </Select>

            <Button 
              variant='contained' 
              size='large' 
              onClick={addProductCard}
              >
              Añadir al carrito
            </Button>

          </div>
        </Container>

      </>
    );
  };


export default DetalleProducto;


const Container = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  height: 100vh; /* Ocupa el 100% del alto de la ventana */

  div {
    text-align: center; /* Alinea el contenido del segundo div al centro */
  }
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const ButtonSelect= styled.button`

border: none;
padding: 10px 15px;
font-size: 20px;
cursor: pointer;
`

const Input = styled.input`
width: 50px;
text-align: center;
font-size: 20px;
padding: 5px;
`

const Imagen = styled.img`
  width: 250px; /* Establece el ancho deseado en píxeles */
  height: 250px; /* Establece la altura deseada en píxeles */
`;