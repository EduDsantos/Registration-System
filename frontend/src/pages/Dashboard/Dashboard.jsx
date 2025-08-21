// src/pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const [alunosAtivos, setAlunosAtivos] = useState(0);
  const [inadimplentes, setInadimplentes] = useState(0);
  const [receitaMensal, setReceitaMensal] = useState(0);
  const [crescimento, setCrescimento] = useState(0);

  // Simulação de dados da API
  const [dadosAlunos, setDadosAlunos] = useState([]);
  const [dadosPagamentos, setDadosPagamentos] = useState([]);

  useEffect(() => {
    setAlunosAtivos(120);
    setInadimplentes(8);
    setReceitaMensal(5600);
    setCrescimento(12);

    // Dados simulados
    setDadosAlunos([
      { mes: "Jan", novos: 10 },
      { mes: "Fev", novos: 15 },
      { mes: "Mar", novos: 8 },
      { mes: "Abr", novos: 20 },
      { mes: "Mai", novos: 25 },
      { mes: "Jun", novos: 18 },
    ]);

    setDadosPagamentos([
      { mes: "Jan", valor: 3000 },
      { mes: "Fev", valor: 4200 },
      { mes: "Mar", valor: 3900 },
      { mes: "Abr", valor: 4800 },
      { mes: "Mai", valor: 5000 },
      { mes: "Jun", valor: 5600 },
    ]);
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Visão Geral</h1>

      <div className="cards-container">
        <div className="card green">
          <span className="icon">👥</span>
          <h3>{alunosAtivos}</h3>
          <p>Alunos Ativos</p>
        </div>

        <div className="card red">
          <span className="icon">⚠️</span>
          <h3>{inadimplentes}</h3>
          <p>Inadimplentes</p>
        </div>

        <div className="card blue">
          <span className="icon">💰</span>
          <h3>R$ {receitaMensal}</h3>
          <p>Receita Mensal</p>
        </div>

        <div className="card yellow">
          <span className="icon">📈</span>
          <h3>{crescimento}%</h3>
          <p>Crescimento do Mês</p>
        </div>
      </div>

      <div className="charts-container">
        {/* Gráfico de linha - Novos alunos */}
        <div className="chart">
          <h2>Novos Alunos</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dadosAlunos}>
              <Line type="monotone" dataKey="novos" stroke="#007bff" strokeWidth={3} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de barras - Pagamentos */}
        <div className="chart">
          <h2>Pagamentos Recebidos</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dadosPagamentos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="valor" fill="#28a745" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
