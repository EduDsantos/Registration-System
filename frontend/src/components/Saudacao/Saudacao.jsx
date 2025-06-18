import React from "react"
import "./saudacao.css"

const Saudacao = () => {

    const userName = "Raphael"

    const data = () => {
        const now = new Date()
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
        return now.toLocaleDateString("pt-BR", options)
    }

    return (
        <div className="saudacao-header">
            <h1>Olá, {userName}!</h1>
            <p>{data()}</p>
        </div>
    )
}

export default Saudacao