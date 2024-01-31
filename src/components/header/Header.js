import { NavLink } from "react-router-dom";
import "./Header.css"
import { Menu, Row, Col, Typography } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from '../../redux/states/ProductReducer';
import { useNavigate } from "react-router-dom";
import { setIsProductSelected } from "../../redux/states/ProductReducer";
function Header({ handleResetFiltros }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [categorias, setCategorias] = useState([])

  const MyIcon = ({ component: Component, style, ...props }) => (
    <Component style={{ fontSize: '32px', color:'white',...style }} {...props} />
  );

  const UserIcon = ({ component: Component, style, ...props }) => (
    <Component style={{ fontSize: '25px', color:'white',...style }} {...props} />
  );


  useEffect(() =>{
    fetch('http://18.232.56.56/categorias/')
    .then(response => response.json())
    .then(data =>{

      setCategorias(data.categorias)
    })
    .catch(err=> console.error(err))
  },[])

  const handleStart = () =>{
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://18.232.56.56/productos/');
        const data = await response.json();
        dispatch(setProducts(data.productos))
        navigate('/')
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    fetchProductos()
  }

  const handleCategoria = (categoria) =>{
    fetch(`http://18.232.56.56/categoria/${categoria}/`)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        dispatch(setProducts(data.productos))
        navigate('/')
    })
    .catch(err => console.error(err))

  }

  const handleCart = () =>{
    navigate('/cart')
  }

  return (
    <Menu mode="horizontal" style={{ backgroundColor: '#030201' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Menu.Item key="logo">
            <Button 
            size="large" 
            type="text" 
            style={{color: 'white', fontSize: '20px'}} 
            onClick={handleStart}>
            Matt Market
            </Button>
          </Menu.Item>
        </Col>
        <Col>
          {categorias.map(categoria=>(
            <Button 
            size="large" 
            type="text" 
            style={{color: 'white', fontSize: '18px'}} 
            onClick={ () => handleCategoria(categoria.nombre)}>
              {categoria.nombre}
            </Button>
          ))}
          

        </Col>
      </Row>
      <Col style={{ marginLeft: '40%', display: 'flex', alignItems: 'center' }} onClick={handleCart}>
        <Menu.Item key="cart">
          <MyIcon component={ShoppingCartOutlined} />
          <span style={{ marginLeft: '5px', fontSize: '20px', color:'white' }}>Carrito</span>
        </Menu.Item>
      </Col>
      <Col style={{display: 'flex', alignItems: 'center' }}>
        <Menu.Item key="user">
          <UserIcon component={UserOutlined} />
          <span style={{ marginLeft: '5px', fontSize: '20px', color:'white' }}>Cuenta</span>
        </Menu.Item>
      </Col>
    </Menu>
  );
}

export default Header;