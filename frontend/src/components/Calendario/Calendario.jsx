// src/components/TodaySchedule.jsx
import React from "react";
import "./calendario.css";

const todayClasses = [
  { time: "06:30", name: "Treinamento Funcional" },
  { time: "18:00", name: "Jiu-jitsu Iniciante" },
  { time: "19:30", name: "Jiu-jitsu Avançado" },
];

const TodaySchedule = () => {
  return (
    <div className="today-schedule">
      <h3>Aulas de Hoje</h3>
      <ul>
        {todayClasses.map((classItem, index) => (
          <li key={index}>
            <strong>{classItem.time}</strong> – {classItem.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodaySchedule;
