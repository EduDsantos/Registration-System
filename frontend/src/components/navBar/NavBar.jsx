import React from 'react'
import './NavBar.css'

export default function NavBar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><a href="/dashboard">Visão Geral</a></li>
                <li><a href="/alunos">Lista de Alunos</a></li>
                <li><a href="/pagamentos">Pagamentos</a></li>
            </ul>
        </nav>
    )
}