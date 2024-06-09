import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { Button } from '@mui/material';

const Login = () => {
  

  return (
    <LoginContainer>
      <FormContainer>
        <h1>Iniciar sesión</h1>
        <TextField 
        label="Correo electrónico" 
        variant="outlined" 
        fullWidth 
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: grey[500], // Color del borde por defecto
            },
            '&:hover fieldset': {
              borderColor: grey[500], // Color del borde al pasar el mouse
            },
            '&.Mui-focused fieldset': {
              borderColor: grey[500], // Color del borde al hacer foco
            },
          },
        }}
         />
        <TextField 
        label="Contraseña" 
        variant="outlined" 
        fullWidth 
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: grey[500],
            },
            '&:hover fieldset': {
              borderColor: grey[500], 
            },
            '&.Mui-focused fieldset': {
              borderColor: grey[500], 
            },
          },
        }}
         />
        <Button
        variant='contained'
        color='info'
        fullWidth
        size="large"
        style={{marginTop: "15px"}}
        >
          Ingresar
        </Button>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;


const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

const FormContainer = styled.div`
  border: 1px solid #d1d1d1;
  padding: 20px;
  border-radius: 4px;
  max-width: 25%;
  width: 100%;

  @media (min-width: 1200px) {
    /* Estilos para pantallas grandes */
    max-width: 400px; /* Por ejemplo, ajusta este valor según tus necesidades */
  }
`;