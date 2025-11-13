import React, { useState } from 'react'
import './NavBar.css'

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    return (

        <nav className="navbar">

            <span
                className="menu-icon material-symbols-outlined menu-icon"
                onClick={() => setIsOpen(!isOpen)}
            >
                menu
            </span>

            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><a href="/dashboard">Visão Geral</a></li>
                <li><a href="/calendario">Calendario</a></li>
                <li><a href="/alunos">Lista de Alunos</a></li>
                <li><a href="/pagamentos">Pagamentos</a></li>
                <li><a href="/aula">Criar Aula</a></li>
                {/* <li><a href="/presenca">Criar Aula</a></li> */}
            </ul>
        </nav>
    )
}
