import React from "react";
import "./overview.css";

const data = [
    { label: "Jan", value: 20 },
    { label: "Fev", value: 35 },
    { label: "Mar", value: 25 },
    { label: "Abr", value: 40 },
    { label: "Mai", value: 32 },
    { label: "Jun", value: 50 },
];

const OverviewChart = () => {
    const maxValue = Math.max(...data.map((d) => d.value));

    return (
        <div className="barra-container">
            <h3>Evolução de Matrículas (Mensal)</h3>
            <div className="barra-bars">
                {data.map((item, index) => (
                    <div className="barra-bar" key={index}>
                        <div
                            className="bar"
                            style={{ height: `${(item.value / maxValue) * 100}%` }}
                            title={`${item.value} matrículas`}
                        ></div>
                        <span className="bar-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OverviewChart;
