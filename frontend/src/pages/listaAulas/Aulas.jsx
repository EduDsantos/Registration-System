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


                        <p><strong>Data:</strong> {formatarData(aula.data)}</p>
                        <p><strong>Horário:</strong> {aula.horario}</p>
                        <p><strong>Tipo:</strong> {aula.tipo}</p>

                        <div className="btn-group">
                            <button className="btn-excluir" onClick={() => apagarAula(aula._id)}>
                                Excluir
                            </button>

                            <button
                                className="btn-ver"
                                onClick={() => navigate(`/aulas/${aula._id}`)}
                            >
                                Ver Aula
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
