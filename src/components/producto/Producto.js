import './Producto.css'
import { Link } from 'react-router-dom';

const Producto = ({id, nombre, imagen, precio, categoria, todos}) => {
    return(
        <div className="product-card" style={todos ? {marginTop: "10%"} : null}>
            <Link to={`/producto/${id}`}>
                <img src={imagen} alt="imagen" className="product-card-img" />
            </Link>
            <div className="product-card-info">
                <h3 className="product-card-title">{nombre}</h3>
                <h4 className="product-card-category">{categoria}</h4>
                <p className="product-card-price">${precio}</p>
            </div>
        </div>
    )
}
  
export default Producto;
