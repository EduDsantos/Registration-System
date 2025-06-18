// src/components/QuickAlerts.jsx
import React from "react";
import "./alertasRapidos.css";

const alerts = [
    { type: "vencida", message: "João da Silva está com a mensalidade vencida." },
    { type: "vencendo", message: "Plano de Ana Souza vence em 3 dias." },
    { type: "aniversario", message: "Hoje é aniversário de Carlos Mendes 🎉" },
];

const QuickAlerts = () => {
    return (
        <div className="quick-alerts">
            <h3>Alertas Rápidos</h3>
            <ul>
                {alerts.map((alert, index) => (
                    <li key={index} className={`alert ${alert.type}`}>
                        {alert.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuickAlerts;
