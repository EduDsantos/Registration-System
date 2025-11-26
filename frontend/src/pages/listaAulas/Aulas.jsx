import { useEffect, useState } from "react";
import api from "../../services/api";
import { Navigate, useNavigate } from "react-router-dom";

import "./aulas.css";
import Header from "../../components/Header/Header";

export default function ListaAulas() {
    const [aulas, setAulas] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        buscarAulas();
    }, []);

    async function buscarAulas() {
        try {
            const res = await api.get("/aulas");
            setAulas(res.data);
        } catch (err) {
            console.log("Erro ao buscar aulas:", err);
        }
    }

    async function apagarAula(id) {
        const confirmar = window.confirm("Você tem certeza que deseja excluir essa aula?");
        if (!confirmar) return;

        try {
            await api.delete(`/aulas/${id}`);
            setAulas(aulas.filter(a => a._id !== id));
        } catch (err) {
            console.log("Erro ao apagar aula:", err);
        }
    }

    function formatarData(d) {
        return new Date(d).toLocaleDateString("pt-BR");
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
            <div className="lista-aulas-container">
                <h2>Histórico de Aulas</h2>

                {aulas.map(aula => (
                    <div
                        key={aula._id}
                        className="aula-card"
                    // onClick={() => navigate(`/aulas/${aula._id}`)}
                    >


                        <div className="dadosAulas">
                            <p><strong>Data:</strong> {formatarData(aula.data)}</p>
                            <p><strong>Modalidade: </strong><span className={coresDiferentes(aula.tipo)}> {aula.tipo}</span></p>
                            <p><strong>Horário:</strong> {aula.horario}</p>
                        </div>

                        <div className="btn-group">
                            <button
                                className="btn-ver"
                                onClick={() => navigate(`/aulas/${aula._id}`)}
                            >
                                Ver Aula
                            </button>
                            <button className="btn-excluir" onClick={() => apagarAula(aula._id)}>
                                Excluir
                            </button>


                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
