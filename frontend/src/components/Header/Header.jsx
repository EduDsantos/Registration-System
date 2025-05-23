import React from 'react';
import './Header.css';
import NavBar from '../navBar/NavBar';
import images from '../../images/logo.png'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log('Deslogado')
        alert("Deslogado")
        localStorage.removeItem('token')

        navigate('/')
    }



    return (
        <header className="header">
            <div className="logo">
                <img src={images} className="logoImg" alt="Logo" />
            </div>
            <NavBar />
            <button className="logout-btn" onClick={handleLogout}>
                🚪 SAIR
            </button>
        </header>
    );
}