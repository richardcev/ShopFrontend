import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { grey } from '@mui/material/colors';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { isAuthenticatedUser, setAccessTokenUser, setRefreshTokenUser } from '../../redux/states/UserReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate= useNavigate()
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleLogin = () =>{
    if(email === "" || password=== ""){
      toast.error("Ingrese usuario y contraseña", {
        hideProgressBar: true
      })
    }

    else if(email!== "" && password!== ""){
      if(isValidEmail(email)){
        const data= {
          email: email,
          password: password
        }
        fetch(`${apiUrl}api/login/`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
          if(res.detail === "Invalid credentials"){
            toast.error("Credenciales incorrectas", {
              hideProgressBar: true
            })
          }
          else if(res.access){
            dispatch(isAuthenticatedUser(true))
            dispatch(setAccessTokenUser(res.access))
            dispatch(setRefreshTokenUser(res.refresh))
            toast.success("Inicio de sesión exitoso", {
              hideProgressBar: true
            })
            navigate('/')
          }
        })
        .catch(err=> console.error(err))

      }
      else{
        toast.error("Correo inválido", {
          hideProgressBar: true
        })
      }
    }
  }

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

  const handleOnChange= (e, field) =>{
    let textfield= e.target.value
    if(field === "user"){
      setEmail(textfield)
    }
    else if(field=== "password"){
      setPassword(textfield)
    }
  }

  const handleRegister= () => {
    navigate("/cuenta/register")
  }
  

  return (
    <LoginContainer>
      <FormContainer>
        <h1>Ingresa a tu cuenta</h1>
        <TextField 
        label="Correo electrónico" 
        variant="outlined" 
        fullWidth 
        margin="normal"
        onChange={(e) => handleOnChange(e, "user")}
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
        type="password"
        onChange={(e) => handleOnChange(e, "password")}
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
        onClick={handleLogin}
        >
          Iniciar sesión
        </Button>
        <div style={{textAlign: "center", marginTop: "10px"}}>
          <span >¿No tienes cuenta Matt Store? </span> 
          <span style={{cursor: "pointer"}} onClick={handleRegister}><b>Regístrate ahora</b></span>
        </div>
      </FormContainer>
      <ToastContainer />
    </LoginContainer>
  );
};

export default Login;


const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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