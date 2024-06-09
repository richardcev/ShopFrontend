import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/images/LOGOMATT2.png'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProducts } from '../../redux/states/ProductReducer';
import CustomizedInputBase from "../inicio/searchProduct";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { Typography } from "@mui/material";


const HeaderCustom = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [categorias, setCategorias] = useState([])
    const [subCategorias, setSubCategorias] = useState([])
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const openUser = Boolean(anchorEl);


    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    const handleCategoryClick = (categoria) => {
      let subCategoriasMenu = []
      for(let subcat of subCategorias){
        if(subcat.categoria === categoria.id){
          subCategoriasMenu.push(subcat)
        }
      }
      console.log(subCategoriasMenu)
      setSelectedCategory(subCategoriasMenu);
    };
  
    const handleBackToCategories = () => {
      setSelectedCategory(null);
    };

    useEffect(() =>{
        fetch('http://127.0.0.1:8000/categorias/')
        .then(response => response.json())
        .then(categoriasData =>{
          setCategorias(categoriasData)
        })
        .catch(err=> console.error(err))

        fetch('http://127.0.0.1:8000/subcategorias/')
        .then(response => response.json())
        .then(data =>{
          setSubCategorias(data)
        })
        .catch(err=> console.error(err))
      },[])

    const handleCategoria = (id, subcategoria) =>{

    fetch(`http://127.0.0.1:8000/productos/?subcategoria=${id}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        dispatch(setProducts(data))
        navigate(`/categoria/${id}/${subcategoria}`)
        setOpen(false)
        handleBackToCategories()
    })
    .catch(err => console.error(err))
    }

    const handleStart = () =>{
        const fetchProductos = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/productos/');
            const data = await response.json();
            dispatch(setProducts(data))
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

    const handleClickUser = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleCloseUser = () => {
      setAnchorEl(null);
    };

    const DrawerList = (
      <Box sx={{ width: 300 }} role="presentation">
        {
          selectedCategory ? (
            <>
              <Typography 
              variant="h6" sx={{ padding: '16px' }} 
              style={{backgroundColor: "#0B2034", color: "#fff", cursor: "pointer"}}
              onClick={handleBackToCategories}
              >
              <KeyboardArrowLeftIcon/>
              Menú principal
              </Typography>
              <List>
              {selectedCategory.map((item) => (
                <ListItem key={item.nombre} disablePadding>
                  <ListItemButton onClick={() => handleCategoria(item.id, item.nombre)}>
                    <ListItemText primary={item.nombre} />
                    <KeyboardArrowRightIcon/>
                  </ListItemButton>
                </ListItem>
              ))
              }
              </List>
            </>
          )
          :
          <>
            <Typography variant="h6" sx={{ padding: '16px' }} style={{backgroundColor: "#0B2034", color: "#fff"}}>
            Categorías
            </Typography>
            <List>
            {
            categorias.map((item) => (
              <ListItem key={item.nombre} disablePadding>
                <ListItemButton onClick={() => handleCategoryClick(item)}>
                  <ListItemText primary={item.nombre} />
                  <KeyboardArrowRightIcon/>
                </ListItemButton>
              </ListItem>
            ))
            }
            </List>
          </>
        }
        <Divider />
      </Box>
    );


    return(
        <>
        <FirstHeader>
            <ContainerImg onClick={handleStart} >
                <Imagen src={logo} alt="Supermercado" />
            </ContainerImg>
            <CustomizedInputBase />
            
            <PersonOutlineIcon
              fontSize="large"
              sx={{ p: 0, cursor: "pointer" }} 
              style={{ color: "white", marginLeft: "5%" }}
              onClick={handleClickUser}
            />
            <p style={{fontSize: "20px", cursor:"pointer", color: "white"}} onClick={handleClickUser}>Cuenta</p>
            <Menu
              anchorEl={anchorEl}
              open={openUser}
              onClose={handleCloseUser}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <MenuItem onClick={handleCloseUser} component={Link} to="/cuenta/login">Iniciar sesión</MenuItem>
              <MenuItem onClick={handleCloseUser}>Crear cuenta</MenuItem>
            </Menu>

            <LocalShippingOutlinedIcon
              fontSize="large"
              sx={{ p: 0, cursor: "pointer" }} 
              style={{ color: "white", marginLeft: "2%" }}

            />
            <p style={{fontSize: "20px", cursor:"pointer", color: "white"}} onClick={handleCart}>Pedidos</p>

            <ShoppingCartOutlinedIcon
                fontSize="large"
                sx={{ p: 0, cursor: "pointer" }} 
                onClick={handleCart}
                style={{ color: "white", marginLeft: "2%" }}
            />
            <p style={{fontSize: "20px", cursor:"pointer", color: "white"}} onClick={handleCart}>Carrito</p>
        </FirstHeader>
        <NavBarContainer>
          <div>
            <Button
              id="basic-button"
              onClick={toggleDrawer(true)}
              style={{color:"white", marginLeft: "45px", padding:"0"}}
            >
                <MenuIcon style={{cursor:"pointer", color:"white"}}/>
                CATEGORÍAS
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
        </NavBarContainer>
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
  display: grid;
  grid-template-columns: 1fr 3fr; 
  padding: 4px;
  background-color: #0B2034;
`;

// Estilos para cada opción del menú
const MenuOption = styled.span`
  margin: 0 10px;
  cursor: pointer;
`;

const Imagen = styled.img`
  width: 70%;
  object-fit: cover;
`;


const ContainerImg = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  cursor: pointer;
  width: 15%;
`;

const FirstHeader = styled.div`
  display: flex;
  align-items: center; /* Alinear elementos verticalmente en el centro */
  padding: 15px;
  background-color: #02060A
  /* Ajustar el margen entre ContainerImg y CustomizedInputBase */
`