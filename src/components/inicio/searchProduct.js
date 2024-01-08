import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from '../../redux/states/ProductReducer';
import { useState } from 'react';

export default function CustomizedInputBase() {
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
          event.preventDefault();
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
  return (
    <Busqueda>
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Buscar producto"
        inputProps={{ 'aria-label': 'buscar producto' }}
        onChange={validoEntrada}
        onKeyDown={handleKeyDown}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleBusqueda} disabled={!busqueda}>
        <SearchIcon />
      </IconButton>
    </Paper>
    </Busqueda>
  );
}

const Busqueda = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
`;