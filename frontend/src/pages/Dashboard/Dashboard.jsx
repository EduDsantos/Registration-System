import React, { useEffect, useState } from "react"
import { Users } from "lucide-react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import "./dashboard.css"
import Header from "../../components/Header/Header"
import api from "../../services/api"

export default function Dashboard() {
  const [alunosAtivos, setAlunosAtivos] = useState(0);
  const [pagPendentes, setPagPendentes] = useState(0);
  const [pagAtrasados, setAtrasados] = useState(0);
  const [refetchKey, setRefetchKey] = useState(0);

  // 🔹 Mock inicial para não dar erro
  const [matriculas, setMatriculas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const ativosRes = await api.get("/alunos/ativos");
        setAlunosAtivos(ativosRes.data.total);

        const atrasados = await api.get("/alunos/pagamentos/atrasados");
        setAtrasados(atrasados.data.total);

        const pendentes = await api.get("/alunos/pagamentos/pendentes");
        setPagPendentes(pendentes.data.total);

        const historicoRes = await api.get("/alunos/matriculas/mensal");
        setMatriculas(historicoRes.data);

      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      }
    }
    fetchData();
  }, [refetchKey]);

  return (
    <div className="dashboard-container">
        <Header />
        <h2>Olá, Raphael!</h2>
      <div className="main-container">
        <p className="date">
          {new Date().toLocaleString("pt-BR", { dateStyle: "full", timeStyle: "short" })}
        </p>
        <div className="cards-container">
          <div className="card green">
            <Users size={32} />
            <h3>{alunosAtivos}</h3>
            <p>Alunos Ativos</p>
          </div>
          <div className="card green">
            <Users size={32} />
            <h3>{pagAtrasados}</h3>
            <p>Pagamentos atrasados</p>
          </div>
        </div>
        {/* 🔹 Gráfico agora usa `matriculas` */}
        <div className="chart-container">
          <h3>Evolução de Matrículas (Mensal)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={matriculas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="matriculas" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
