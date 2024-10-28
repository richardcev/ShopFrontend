import styled from "styled-components";
import { useState, useEffect } from "react";
import './Header.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/LOGOMATT2.png'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { isAuthenticatedUser, setAccessTokenUser, setRefreshTokenUser } from '../../redux/states/UserReducer';
import { setCantidadProductos } from "../../redux/states/CartReducer";
import UserMenu from "./UserMenu/UserMenu";
import { Container, Row, Col } from 'react-bootstrap';
import Badge from '@mui/material/Badge';
import { styled as muiStyled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';


const StyledBadge = muiStyled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -4,
    top: 13,
    padding: '0 4px',
  },
}));


const HeaderCustom = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { users, cartproducts } = useSelector((store) => store)
    const { isAuthenticated, refresh } = users
    const [categorias, setCategorias] = useState([])
    const [subCategorias, setSubCategorias] = useState([])
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedSubCategories, setSelectedSubCategories] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const openUser = Boolean(anchorEl);
    const apiUrl = process.env.REACT_APP_API_URL;
    const { productsCart, cantidadProductos } = cartproducts

    useEffect(() =>{
      let cantidad_updated= 0
      for(let producto of productsCart){
        cantidad_updated = cantidad_updated + producto.cantidad
      }
      dispatch(setCantidadProductos(cantidad_updated))
    }, [productsCart])


    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    const handleCategoryClick = (categoria) => {
      let categoriaFormat= categoria.nombre.toLowerCase().replace(/ /g, "-")
      setSelectedCategory(categoriaFormat)
      let subCategoriasMenu = []
      for(let subcat of subCategorias){
        if(subcat.categoria === categoria.id){
          subCategoriasMenu.push(subcat)
        }
      }
      console.log(subCategoriasMenu)
      setSelectedSubCategories(subCategoriasMenu);
    };
  
    const handleBackToCategories = () => {
      setSelectedSubCategories(null);
    };

    useEffect(() =>{
        fetch(`${apiUrl}categorias/`)
        .then(response => response.json())
        .then(categoriasData =>{
          setCategorias(categoriasData)
        })
        .catch(err=> console.error(err))

        fetch(`${apiUrl}subcategorias/`)
        .then(response => response.json())
        .then(data =>{
          setSubCategorias(data)
        })
        .catch(err=> console.error(err))
      },[])

    const handleSubCategoria = (id, subcategoria) =>{
      let subcatFormat = subcategoria.toLowerCase().replace(/ /g, "-")
      navigate(`/${selectedCategory}/${subcatFormat}`, { state: { id: id } })
      setOpen(false)
      handleBackToCategories()
    }

    const handleStart = () =>{
        const fetchProductos = async () => {
          try {
            const response = await fetch(`${apiUrl}productos/`);
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

    const handleLogout= () =>{
      const data= {
        refresh: refresh
      }
      fetch(`${apiUrl}api/logout/`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {
        if(res.message == "Logout successful"){
          dispatch(isAuthenticatedUser(false))
          dispatch(setRefreshTokenUser(""))
          dispatch(setAccessTokenUser(""))
          navigate('/')
        }
      })
      .catch(err=> console.error(err))

    }

    const handleMouseEnter = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMouseLeave = () => {
      setAnchorEl(null);
    };

    const DrawerList = (
      <Box sx={{ width: 300 }} role="presentation">
        {
          selectedSubCategories ? (
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
              {selectedSubCategories.map((item) => (
                <ListItem key={item.nombre} disablePadding>
                  <ListItemButton onClick={() => handleSubCategoria(item.id, item.nombre)}>
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
        <Container fluid style={{padding: '15px', backgroundColor: '#0B2034'}}>
          <Row>
            <Col xs={2} onClick={handleStart} style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
              <h4 style={{fontWeight: "bold", color: "white", marginLeft: '11%'}}>Matt Store</h4>
            </Col>
            <Col xs={6}>
              <CustomizedInputBase />
            </Col>
            <Col xs={4}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserMenu isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px',  fontSize: '30px' }}>
                <LocalShippingOutlinedIcon
                  fontSize="inherit"
                  sx={{ p: 0, cursor: "pointer", color: "white", marginRight: "5px" }}
                />
                <span style={{fontSize: "18px", cursor:"pointer", color: "white"}} onClick={handleCart}>Pedidos</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px', fontSize: '30px' }}>
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={cantidadProductos} color="warning" showZero>
                  <ShoppingCartOutlinedIcon
                    fontSize="inherit"
                    sx={{ p: 0, cursor: "pointer", color: "white", }}
                    onClick={handleCart}
                  />
                </StyledBadge>
              </IconButton>
                {/* <div className="conteo-carrito">
                  <span className="cantidad" onClick={handleCart}>{cantidadProductos}</span>
                </div> */}
              </div>
            </div>
            </Col>
          </Row>
        </Container>
        <NavBarContainer>
          <div>
            <Button
              id="basic-button"
              onClick={toggleDrawer(true)}
              style={{color:"white", marginLeft: "9%", padding:"0"}}
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


// Estilos para el navbar
const NavBarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr; 
  padding: 4px;
  background-color: #2C3E59;
`;