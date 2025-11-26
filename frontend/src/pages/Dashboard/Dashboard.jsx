import React, { useEffect, useState } from "react"
import { Users } from "lucide-react"
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, } from "recharts";
import "./dashboard.css"
import Header from "../../components/Header/Header"
import api from "../../services/api"
import Saudacao from "../../components/Saudacao/Saudacao"

export default function Dashboard() {
  const [alunosAtivos, setAlunosAtivos] = useState(0);
  const [pagPendentes, setPagPendentes] = useState(0);
  const [pagAtrasados, setAtrasados] = useState(0);
  const [refetchKey, setRefetchKey] = useState(0);

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

        // const historicoRes = await api.get("/alunos/matriculas/mensal");
        // setMatriculas(historicoRes.data);

      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      }
    }
    fetchData();
  }, [refetchKey]);

  return (
    <div className="dashboard-container">
      <Header />
      <Saudacao />
      <div className="main-container">

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

        {/* <div className="chart-container">
          <h3>Evolução de Matrículas (Mensal)</h3>
          <BarChart
            width={900}
            height={300}
            data={matriculas}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="matriculas" fill="#8884d8" />
          </BarChart>

        </div> */}
      </div>
    </div>
  )
}
