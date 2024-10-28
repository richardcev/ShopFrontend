import { useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from '../../redux/states/ProductReducer';
import { setIsProductSelected } from '../../redux/states/ProductReducer';
import Producto from '../producto/Producto';
import { useLocation } from 'react-router-dom';
import Productos from '../producto/Productos';

const SubCategoria = () =>{
    const dispatch = useDispatch();
    const {
       products
   } = useSelector((store) => store);
    const { productos, isProductSelected } = products
    const location = useLocation();
    const apiUrl = process.env.REACT_APP_API_URL;
    const { id } = location.state || {};

    useEffect(() =>{
      fetch(`${apiUrl}productos/?subcategoria=${id}`)
      .then(response => response.json())
      .then(data =>{
          console.log(data)
          dispatch(setProducts(data))
      })
      .catch(err => console.error(err))

    }, [id])


    return(
      <Productos/>

    )
}

export default SubCategoria;