import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Header/Header";
import "./verAula.css";

export default function VerAula() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [aula, setAula] = useState(null);

    useEffect(() => {
        async function carregar() {
            const res = await api.get(`/aulas/${id}`);
            setAula(res.data);
        }
        carregar();



    }, [id]);





    if (!aula) return <p>Carregando...</p>;

    const dataPt = () => {
        const d = new Date(aula.data);
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",

        }
        return (d.toLocaleDateString("pt-BR", options));
    }

    const coresDiferentes = (m) => {
        switch (m) {
            case "Jiu-Jitsu": return "jiu";
            case "Muay Thai": return "muay";
            case "No-Gi": return "Nogi";
            default: return "";
        }
    }

    return (
        <>
            <Header />
            <div className="main-content">
                <section className="cardsAula">
                    <div className="info-aula">
                        <h1 className="h1Presenca">Detalhes da Aula</h1>
                        <label>Dados da Aula</label>
                        <p>Modalidade<span className={coresDiferentes(aula.tipo)}> {aula.tipo}</span></p>
                        <p>Data <span className="dataFormata">{dataPt(aula.data)}</span></p>
                        <p>Horário <span className="horarioFormata">{aula.horario}</span></p>
                    </div>
                    <div className="presencaContainer">
                        <h3 className="h3Presenca">Presenças</h3>

                        {aula.alunosPresentes.length === 0 && (
                            <p>Nenhum aluno registrado ainda.</p>
                        )}

                        {aula.alunosPresentes.length > 0 && (
                            <table className="tabela-presenca">
                                <thead>
                                    <tr>
                                        <th>Alunos</th>
                                        <th>Presença</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aula.alunosPresentes.map(a => (
                                        <tr key={a.id}>
                                            <td>{a.nome}</td>
                                            <td>{a.presente ? "✔️" : "❌"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <button
                        className="btn-editar"
                        onClick={() => navigate(`/aula/presencas/${id}`, { state: aula })}
                    >
                        Editar Presenças
                    </button>
                </section >
            </div>
        </>
    );
}
