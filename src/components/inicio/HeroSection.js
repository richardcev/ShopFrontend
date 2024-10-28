
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleProductos = () =>{
    navigate('/productos')
  }

  return (
    <section className="landing-section">
      <div className="landing-content">
        <h1>Bienvenidos a Matt Store</h1>
        <p>Tu tienda de confianza en dispositivos tecnológicos. Encuentra los mejores audífonos, parlantes y más, con la mejor calidad y precios accesibles.</p>
        <button className="shop-button" onClick={handleProductos}>Ver Productos</button>
      </div>
    </section>
  );
}

export default HeroSection;

