import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Header/Header";

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

    return (
        <>
            <Header />
            <div className="ver-aula-container">
                <h2>Detalhes da Aula</h2>

                <p><strong>Data:</strong> {aula.data}</p>
                <p><strong>Horário:</strong> {aula.horario}</p>
                <p><strong>Tipo:</strong> {aula.tipo}</p>

                <h3>Presenças</h3>

                {aula.alunosPresentes.length === 0 && (
                    <p>Nenhum aluno registrado ainda.</p>
                )}

                {aula.alunosPresentes.map(a => (
                    <div key={a.id} className="aluno-presenca">
                        <p><strong>{a.nome}</strong></p>
                        <p>Presente: {a.presente ? "✔️" : "❌"}</p>
                    </div>
                ))}

                <button 
                    className="btn-editar"
                    onClick={() => navigate(`/aulas/${id}/presencas`, { state: aula })}
                >
                    Editar Presenças
                </button>
            </div>
        </>
    );
}
