import './inicio.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from '../../redux/states/ProductReducer';

const InputProducto= () =>{
    const dispatch = useDispatch();
    const [busqueda, setBusqueda] = useState('');

    const validoEntrada = (event) =>{
        event.preventDefault()
        setBusqueda(event.target.value);
    }

    function handleBusqueda() {
        fetchData()
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleBusqueda();
        }
    };

    const fetchData = async () => {
        try {
          const response = await fetch(`http://18.232.56.56/search/?text=${busqueda.toLowerCase()}`);
          const data = await response.json();
          dispatch(setProducts(data.productos));
        } catch (error) {
          console.error('Error al obtener los productos:', error);
        }
    };
    return(
    <Busqueda>
        <InputBusqueda
        type='text' 
        name='' 
        placeholder='Buscar producto'
        value={busqueda}
        onChange={validoEntrada}
        onKeyDown={handleKeyDown}
        />
        <BtnBusqueda 
        type='submit' 
        onClick={handleBusqueda}
        disabled= {!busqueda}>
            <FontAwesomeIcon icon={faSearch} />
        </BtnBusqueda>
    </Busqueda>
    )
}

export default InputProducto;

const Busqueda = styled.div`
    position: relative;
    width: 30%;
    margin-top: 2%;
    margin-left: 35%;

    @media (max-width: 767px) {
    /* Cambia a una sola columna en pantallas más pequeñas */
    position: relative;
    width: 80%;
  }
`;

const InputBusqueda = styled.input`
    width: 100%;
    height: 100%;
    display: block;
    font-size: 20px;
    padding: 8px 40px 8px 20px;

    :focus{
        outline: none;
    }
`;

const BtnBusqueda = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    background: none;
    font-size: 18px;
`;