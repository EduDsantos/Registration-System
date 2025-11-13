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

  const aulaInfo = location.state || {};
  const [alunos, setAlunos] = useState([]);
  const [selecionados, setSelecionados] = useState([]);

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const tipoAula = aulaInfo.modalidade;
        const response = await apiPublic.get("/alunos");
        const alunosFiltrados = response.data.filter(a => a.modalidade === tipoAula);
        setAlunos(alunosFiltrados);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    }

    fetchAlunos();
  }, [aulaInfo.modalidade]);

  function togglePresenca(alunoId) {
    if (selecionados.includes(alunoId)) {
      setSelecionados(prev => prev.filter(id => id !== alunoId));
    } else {
      setSelecionados(prev => [...prev, alunoId]);
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
        modalidade: aulaInfo.modalidade,
        alunosPresentes,
      });

      alert("Presenças salvas com sucesso!");
      navigate("/aula"); 
    } catch (error) {
      console.error("Erro ao salvar presenças:", error);
      alert("Erro ao salvar presenças.");
    }
  }

  return (
    <>
      <Header />
      <section className="main-content">
        <h1 className="h1Presenca">Registrar Presenças</h1>

        <div className="info-aula">
          <p><strong>Modalidade:</strong> {aulaInfo.modalidade}</p>
          <p><strong>Data:</strong> {aulaInfo.data}</p>
          <p><strong>Horário:</strong> {aulaInfo.horario}</p>
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
                    className={selecionados.includes(aluno._id) ? "presente" : ""}
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
    </>
  );
}
