import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './UserMenu.css'


export default function UserMenu({ isAuthenticated, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="user-menu-container" onMouseLeave={handleMouseLeave} style={{marginLeft: "5%"}}>
      <button
        ref={buttonRef}
        className="user-menu-button"
        onMouseEnter={handleMouseEnter}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        style={{fontSize: '30px'}}
      >
        <PersonOutlineIcon fontSize='inherit'/>
        <span style={{fontSize: "18px"}}>{isAuthenticated ? "Mi Cuenta" : "Ingresa"}</span>
      </button>
      {isMenuOpen && (
        <div ref={menuRef} className="user-menu">
          <ul>
            {isAuthenticated ? (
              <>
                <li><Link to="/cuenta/datos">Editar datos</Link></li>
                <li><button onClick={handleLogout}>Cerrar sesión</button></li>
              </>
            ) : (
              <>
                <li><Link to="/cuenta/login">Iniciar sesión</Link></li>
                <li><Link to="/cuenta/register">Crear cuenta</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}