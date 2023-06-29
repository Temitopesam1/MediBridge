import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css'
import Logo from '../assets/images/newLogo.jpeg';


const Header = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
    navigate('/login')
  }
    return (
        <header>
          <img src={Logo} alt='Logo' />
          <h1>MediBridge App</h1>
          <button onClick={handleLogin}>Login</button>
      </header>
    );
}

export default Header;