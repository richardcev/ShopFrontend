import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const DatosCuenta = () =>{
    const { users } = useSelector((store) => store)
    const { isAuthenticated, access } = users
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() =>{
        fetchUserDetails()
    },[])


    

    const fetchUserDetails = async () => {
      
        try {
          const response = await fetch(`${apiUrl}api/user/`, {
            method: 'GET', // Método HTTP
            headers: {
              'Authorization': `Bearer ${access}`, // Encabezado para el token de acceso
              'Content-Type': 'application/json' // (Opcional) Tipo de contenido que estás esperando
            }
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log(data); // Maneja la respuesta de manera adecuada
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      

    return(
        <div>

        </div>
    )
}

export default DatosCuenta;