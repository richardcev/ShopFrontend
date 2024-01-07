import { useEffect } from "react";
import axios from "axios"
import './Producto.css'

import { Link } from 'react-router-dom';


const Producto= ({id, nombre, imagen, precio, categoria}) =>{
    
    return(
        <div className="product-card">
            <Link to={`/producto/${id}`}>
                <img src={imagen} alt="imagen" className="product-card-img" />
            </Link>
                <h3 className="product-card-title">{nombre}</h3>
                <h4 className="product-card-category">{categoria}</h4>
                <p className="product-card-price">${precio}</p>
        </div>
    )
}

export default Producto;