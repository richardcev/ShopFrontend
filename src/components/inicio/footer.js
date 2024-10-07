
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo y descripción */}
        <div className="footer-section">
          <h2 className="footer-logo">Matt Store</h2>
          <p className="footer-description">
            Tu destino para las mejores innovaciones tecnológicas. 
          </p>
        </div>

        {/* Secciones */}
        <div className="footer-section">
          <h3 className="footer-title">Productos</h3>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Nuevos lanzamientos</a></li>
            <li><a href="#" className="footer-link">Ofertas</a></li>
            <li><a href="#" className="footer-link">Categorías</a></li>
            <li><a href="#" className="footer-link">Accesorios</a></li>
          </ul>
        </div>

        {/* Información */}
        <div className="footer-section">
          <h3 className="footer-title">Información</h3>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Sobre nosotros</a></li>
            <li><a href="#" className="footer-link">Política de privacidad</a></li>
            <li><a href="#" className="footer-link">Términos y condiciones</a></li>
            <li><a href="#" className="footer-link">Contacto</a></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer-section">
          <h3 className="footer-title">Síguenos</h3>
          <div className="footer-socials">
            <a href="#" className="footer-social-link"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="footer-social-link"><i className="fab fa-twitter"></i></a>
            <a href="#" className="footer-social-link"><i className="fab fa-instagram"></i></a>
            <a href="#" className="footer-social-link"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="footer-bottom">
        <p>&copy; 2024 Matt Store. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

