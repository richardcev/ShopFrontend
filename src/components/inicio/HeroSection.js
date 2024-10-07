
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-container">
      <h1 className="hero-title">Explora lo Último en Tecnología</h1>
      <p className="hero-subtitle">Los mejores productos tecnológicos a tu alcance</p>
      <div className="hero-button-container">
        <button className="hero-primary-button">Ver Productos</button>
        <button className="hero-secondary-button">Ofertas Especiales</button>
      </div>
    </div>
  );
}

export default HeroSection;

