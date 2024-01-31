import styled from "styled-components";
import { useState, useEffect } from "react";
import logo from '../../assets/images/LOGOMATT.png'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProducts } from '../../redux/states/ProductReducer';
import CustomizedInputBase from "../inicio/searchProduct";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';





const HeaderCustom = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [categorias, setCategorias] = useState([])
    useEffect(() =>{
        fetch('http://127.0.0.1:8000/categorias/')
        .then(response => response.json())
        .then(data =>{
    
          setCategorias(data.categorias)
        })
        .catch(err=> console.error(err))
      },[])


    const handleCategoria = (categoria) =>{
    fetch(`http://127.0.0.1:8000/categoria/${categoria}/`)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        dispatch(setProducts(data.productos))
        navigate('/')
    })
    .catch(err => console.error(err))
    }

    const handleStart = () =>{
        const fetchProductos = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/productos/');
            const data = await response.json();
            dispatch(setProducts(data.productos))
            navigate('/')
          } catch (error) {
            console.error('Error al obtener los productos:', error);
          }
        };
        fetchProductos()
      }

      const handleCart = () =>{
        navigate('/cart')
      }


    return(
        <>
        <FirstHeader>
            <ContainerImg onClick={handleStart} >
                <Imagen src={logo} alt="Supermercado" />
            </ContainerImg>
            <CustomizedInputBase />
            <ShoppingCartOutlinedIcon
                fontSize="large"
                sx={{ p: 0, cursor: "pointer" }} 
                onClick={handleCart}
            />
            <p style={{fontSize: "20px"}}>Cart</p>
        </FirstHeader>
        <div>
        <TopLine />
        <NavBarContainer>
            {
                categorias.map((item) => (
                    <MenuItem onClick={ () => handleCategoria(item.nombre)}><p style={{fontSize: "19px"}}>{item.nombre.toUpperCase()}</p></MenuItem>
                ))
            }
        </NavBarContainer>

        </div>
        </>


    )
}

export default HeaderCustom;


const TopLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Estilos para el navbar
const NavBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 8px;
`;

// Estilos para cada opción del menú
const MenuItem = styled.div`
  margin: 0 10px;
  cursor: pointer;
`;

const Imagen = styled.img`
  width: 100%;
  object-fit: cover;
`;


const ContainerImg = styled.div`
  margin-right: 30px;
  cursor: pointer;
  width: 15%;
`;

const FirstHeader = styled.div`
  display: flex;
  align-items: center; /* Alinear elementos verticalmente en el centro */
  padding: 20px;
  /* Ajustar el margen entre ContainerImg y CustomizedInputBase */
`