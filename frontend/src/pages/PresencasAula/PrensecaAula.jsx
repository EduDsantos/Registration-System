import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import api from "../../services/api";
import apiPublic from "../../services/apiPublic";
import "./presencaAula.css";

export default function PresencasAula() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  let aulaInfo = location.state || {};
  const [alunos, setAlunos] = useState([]);
  const [selecionados, setSelecionados] = useState([]);

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const tipoAula = aulaInfo.tipo;
        const response = await api.get("/alunos");
        const alunosFiltrados = response.data.filter(a => a.modalidade === tipoAula);
        setAlunos(alunosFiltrados);
        
        async function buscarAula() {
          if (!location.state) {
            const res = await api.get(`/aulas/${id}`);
            aulaInfo = res.data;
          }
        }
        buscarAula();
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    }

    fetchAlunos();
  }, [aulaInfo.tipo]);

  function togglePresenca(alunoId) {
    if (selecionados.includes(alunoId)) {
      setSelecionados(prev => prev.filter(id => id !== alunoId));
    } else {
      setSelecionados(prev => [...prev, alunoId]);
    }
  }



  const coresDiferentes = (m) => {
    switch (m) {
      case "Jiu-Jitsu": return "jiu";
      case "Muay Thai": return "muay";
      case "No-Gi": return "Nogi";
      default: return "";
    }
  }

  async function salvarPresencas() {
    try {
      const alunosPresentes = alunos
        .filter(a => selecionados.includes(a._id))
        .map(a => ({ id: a._id, nome: a.name }));

      await apiPublic.post(`/aula`, {
        _id: id,
        data: aulaInfo.data,
        horario: aulaInfo.horario,
        tipo: aulaInfo.tipo,
        alunosPresentes,
      });

      alert("Presenças salvas com sucesso!");
      navigate("/aula");
    } catch (error) {
      console.error("Erro ao salvar presenças:", error);
      alert("Erro ao salvar presenças.");
    }
  }

  const dataPt = () => {
    const now = new Date()
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",

    }
    return now.toLocaleDateString("pt-BR", options)
  }
  return (
    <>
      <Header />
      <section className="main-content">

        <section className="cardsAula">
          <div className="info-aula">
            <h1 className="h1Presenca">Registrar Presenças</h1>
            <label>Dados da Aula</label>
            <p>Modalidade<span className={coresDiferentes(aulaInfo.tipo)}> {aulaInfo.tipo}</span></p>
            <p>Data <span className="dataFormata">{dataPt(aulaInfo.data)}</span></p>
            <p>Horário <span className="horarioFormata">{aulaInfo.horario}</span></p>
          </div>
          <table className="tabela-presenca">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Faixa</th>
                <th>Presente?</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno._id}>
                  <td>{aluno.name}</td>
                  <td>{aluno.faixa}</td>
                  <td>
                    <button
                      onClick={() => togglePresenca(aluno._id)}
                      className={selecionados.includes(aluno._id) ? "presente" : "marcar"}
                    >
                      {selecionados.includes(aluno._id) ? "Presente ✅" : "Marcar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btnSalvar" onClick={salvarPresencas}>
            Salvar Presenças
          </button>
        </section>
      </section>
    </>
  );
}
