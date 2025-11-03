import React from 'react';
import './Header.css';
import NavBar from '../navBar/NavBar';
import images from '../../images/logo.png'
import Logout from '../Logout/Logout';


export default function Header() {

    return (
        <header className="header">
            <div className="logo">
                <img src={images} className="logoImg" alt="Logo" />
            </div>
            <NavBar />
            <Logout />


        </header>
    );
}