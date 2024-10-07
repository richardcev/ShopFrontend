import styled from "styled-components";
import { TextField, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { Button } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import { grey } from '@mui/material/colors';
import { useState } from "react";

const Register = () =>{
    const [form, setForm] = useState(
      {
        nombres: "",
        apellidos: "",
        correo: "",
        tipoDocumento: "",
        documento: "",
        password: "",
        confirmPassword: ""
      }
    )
    const [labelDoc, setLabelDoc] = useState("Cédula")
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [validEmail, setValidEmail] = useState(true)
    const [matchPassword, setMatchPassword] = useState(true)
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleOnChange= (e) =>{
      let name = e.target.name
      let value = e.target.value
      if(name === "correo"){
        setValidEmail(isValidEmail(value))
      }
      if(name === "confirmPassword"){
        if(value !== form.password){
          setMatchPassword(false)
        }
        else{
          setMatchPassword(true)
        }
      }
      if(name === "tipoDocumento"){
        if(value === "cedula"){
          setLabelDoc("Cédula")
        }
        else if(value === "pasaporte"){
          setLabelDoc("Pasaporte")
        }
        else if(value === "ruc"){
          setLabelDoc("R.U.C")
        }
      }
      setForm({
        ...form,
        [name] : value
      })
    }

    const isValidEmail = (email) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    }

    const handleRegister = () =>{
      setAttemptedSubmit(true)
      if(form.nombres != "" && form.apellidos != "" && form.correo != "" && isValidEmail(form.correo) && form.password != "" && matchPassword ){
        const data = {
          nombres: form.nombres,
          apellidos: form.apellidos,
          email: form.correo,
          password: form.password,
          tipo_documento: form.tipoDocumento,
          documento: form.documento
        }
        fetch(`${apiUrl}api/register/`, {
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) 
        })
        .then((res) => res.json())
        .then(res => {
          if(res.message){
            alert(res.message)
          }
          else{
            alert("ERROR")
          }
        })
        .catch(err => console.error(err))
      }
    }
    return(
        <RegisterContainer>
        <FormContainer>
          <h1>Crear cuenta</h1>
          <TextField 
          label="Nombres" 
          variant="outlined" 
          fullWidth 
          margin="normal"
          error={form.nombres ===  "" && attemptedSubmit ? true : false}
          helperText={form.nombres ===  "" && attemptedSubmit ? "Por favor ingresa tu nombre" : ""}
          name="nombres"
          onChange={handleOnChange}
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
          label="Apellidos" 
          variant="outlined" 
          fullWidth 
          margin="normal"
          name="apellidos"
          error={form.apellidos ===  "" && attemptedSubmit ? true : false}
          helperText={form.apellidos ===  "" && attemptedSubmit ? "Por favor ingresa tu apellido" : ""}
          onChange={handleOnChange}
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
        <TextField 
          label="Correo electrónico" 
          variant="outlined" 
          fullWidth 
          margin="normal"
          name="correo"
          error={form.correo ===  "" && attemptedSubmit ? true : !validEmail ? true  : false}
          helperText={form.correo ===  "" && attemptedSubmit ? "Por favor ingresa tu correo" : !validEmail ? "Correo inválido"  : ""}
          onChange={handleOnChange}
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

        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Tipo de documento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.tipoDocumento}
            label="Tipo de documento"
            name="tipoDocumento"
            onChange={handleOnChange}
          >
            <MenuItem value={"cedula"}>Cédula</MenuItem>
            <MenuItem value={"pasaporte"}>Pasaporte</MenuItem>
            <MenuItem value={"ruc"}>R.U.C</MenuItem>
          </Select>
        </FormControl>

        <TextField 
          label={labelDoc} 
          variant="outlined" 
          fullWidth 
          margin="normal"
          name="documento"
          onChange={handleOnChange}
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

        <TextField 
        label="Contraseña" 
        variant="outlined" 
        fullWidth 
        margin="normal"
        type="password"
        name="password"
        error={form.password ===  "" && attemptedSubmit ? true : false}
        helperText={form.password ===  "" && attemptedSubmit ? "Por favor escribe tu contraseña" : ""}
        onChange={handleOnChange}
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
        <TextField 
        label="Confirmar contraseña" 
        variant="outlined" 
        fullWidth 
        margin="normal"
        type="password"
        name="confirmPassword"
        error={form.confirmPassword ===  "" && attemptedSubmit ? true : !matchPassword ? true : false}
        helperText={form.confirmPassword ===  "" && attemptedSubmit ? "Por favor escribe tu contraseña nuevamente" : !matchPassword ? "Contraseñas no coinciden" : ""}
        onChange={handleOnChange}
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
          onClick={handleRegister}
          >
            Registrarse
          </Button>
        </FormContainer>
        <ToastContainer />
      </RegisterContainer>

    )
}

export default Register;

const RegisterContainer = styled.div`
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