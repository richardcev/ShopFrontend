import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { setIsProductSelected } from '../../redux/states/ProductReducer';
import { useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/states/CartReducer';
import { useNavigate } from 'react-router-dom';
import { setSubTotal, setCantidadProductos } from '../../redux/states/CartReducer';
import CantidadProductos from '../CantidadProductos/CantidadProductos';
import DetalleItems from './DetalleItems/DetalleItems';
import './DetalleProducto.css'

const DetalleProducto = () => {
    const dispatch = useDispatch();
    const params = useParams()
    const { cartproducts } = useSelector((store) => store)
    const { productsCart, subTotal } = cartproducts
    const [producto, setProducto] = useState(null)
    const [cantidad, setCantidad] = useState(1);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleIncrement = () => {
      setCantidad(cantidad + 1);
    };
  
    const handleDecrement = () => {
      if (cantidad > 1) {
        setCantidad(cantidad - 1);
      }
    };
    
    //ESTO APLICA CUANDO EL USUARIO ESCRIBE UN NUMERO (NO USA LOS BOTONES + Y -)
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
      dispatch(setIsProductSelected(true))
      fetch(`${apiUrl}productos/?id=${params.id}`)
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
        {
          producto && 
          <> 
          <Breadcrumbs className='breadcumbs' separator="›" sx={{margin: '3% 0 0 5%' }}>
          <Link
            component={RouterLink}
            underline="hover" 
            color="inherit" 
            to={`/${producto.categoria_nombre.toLowerCase().replace(/ /g, "-")}`}
            state={{ id: producto.categoria }}
            >
            {producto.categoria_nombre}
          </Link>
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={`/${producto.categoria_nombre.toLowerCase().replace(/ /g, "-")}/${producto.sub_categoria_nombre.toLowerCase().replace(/ /g, "-")}`} // Usa `to` en lugar de `href`
            state={{ id: producto.subcategoria }} // Esta línea es válida para pasar el estado
          >
            {producto.sub_categoria_nombre}
          </Link>
          <Typography sx={{ color: 'text.primary' }}>{producto.nombre}</Typography>
          </Breadcrumbs>
          
          <Container>
            <div className='imagen'>
              <Imagen src={producto.imagen}/>
            </div>
            <div className='datosProducto'>
              <p style={{marginBottom: '10px'}}>{producto.nombre}</p>
              <p style={{marginBottom: '20px', fontWeight: 'bold', fontSize: '20px'}}>${producto.precio}</p>
              <CantidadProductos 
                cantidad={cantidad} 
                handleDecrement={handleDecrement} 
                handleIncrement={handleIncrement}
                handleInputChange={handleInputChange}
              />
  
              <Button 
                variant='contained' 
                size='large' 
                onClick={addProductCard}
                sx={{ 
                  textTransform: 'none',
                  backgroundColor: '#2C3E59',
                  marginTop: '25px'
                 }}
                >
                Añadir al carrito
              </Button>
            </div>
          </Container>
          <DetalleItems producto={producto.id}/>
          </>
        }
        </>
    );
  };


export default DetalleProducto;


const Container = styled.div`
  margin-top: 50px;
  display: flex;
  margin-left: 15%;
`;

const Imagen = styled.img`
  width: 100%; /* Establece el ancho deseado en píxeles */
`;