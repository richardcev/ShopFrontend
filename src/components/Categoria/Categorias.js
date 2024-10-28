import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from '../../redux/states/ProductReducer';
import { setIsProductSelected } from '../../redux/states/ProductReducer';
import Producto from '../producto/Producto';
import { useNavigate } from 'react-router-dom';
import "./Categoria.css"


const Categorias = () =>{
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate()
    const [categorias, setCategorias] = useState([])
    useEffect(() =>{
        fetch(`${apiUrl}categorias/`)
        .then(response => response.json())
        .then(data => {
            if(data){
                setCategorias(data)
            }
        })
        .catch(err => console.error(err))
    }, [])

    const handleCategoria = (id, categoria) =>{
        navigate(`/${categoria.toLowerCase().replace(/ /g, "-")}`, {
            state: {id}
        })
    }
    
    return(
        <div className='container-categorias'>
            {
                categorias.map(item => (
                    <div className='categoria' onClick={() => handleCategoria(item.id, item.nombre)}>
                        <p>{item.nombre}</p>
                    </div>
                ))
            }
        </div>

    )
}

export default Categorias;