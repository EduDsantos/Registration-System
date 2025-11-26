import React, { useState } from "react";
import "./NavBar.css";

export default function NavBar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button className="hamburger-btn" onClick={() => setOpen(true)}>
                <span className="material-symbols-outlined">menu</span>
            </button>

            <div
                className={`overlay ${open ? "show" : ""}`}
                onClick={() => setOpen(false)}
            ></div>

            <aside className={`side-menu ${open ? "open" : ""}`}>
                <div className="menu-header">
                    <h2>Menu</h2>
                </div>

                <ul>
                    <li><a href="/dashboard">Visão Geral</a></li>
                    <li><a href="/alunos">Lista de Alunos</a></li>
                    <li><a href="/pagamentos">Pagamentos</a></li>
                    <li><a href="/aula">Criar Aula</a></li>
                    <li><a href="/aulas">Histórico</a></li>
                </ul>
            </aside>

                <ul className="menuDesk">
                    <li><a href="/dashboard">Visão Geral</a></li>
                    <li><a href="/alunos">Lista de Alunos</a></li>
                    <li><a href="/pagamentos">Pagamentos</a></li>
                    <li><a href="/aula">Criar Aula</a></li>
                    <li><a href="/aulas">Histórico</a></li>
                </ul>
        </>
    );
}
