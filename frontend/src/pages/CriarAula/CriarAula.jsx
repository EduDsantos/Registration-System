import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import apiPublic from "../../services/apiPublic";
import "./criarAula.css";

export default function CriarAula() {
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");
    const [tipo, setTipo] = useState("");
    const navigate = useNavigate();

    async function criarAula() {
        if (!data || !horario || !tipo) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await apiPublic.post("/aula", { data, horario, tipo });

            const aulaCriada = response.data.criarAula;

            if (!aulaCriada || !aulaCriada._id) {
                throw new Error("ID da aula não retornado pelo servidor.");
            }

            alert("✅ Aula criada com sucesso!");

            navigate(`/aula/${aulaCriada._id}/presencas`, {
                state: {
                    aulaId: aulaCriada._id,
                    tipo: aulaCriada.tipo,
                    data: aulaCriada.data,
                    horario: aulaCriada.horario
                }
            });
        } catch (error) {
            console.error("Erro ao criar aula:", error);
            alert("❌ Erro ao criar aula!");
        }
    }

    return (
        <>
            <Header />
            <section className="main-content">
                
                <div className="form-calendario">

            <h2 className="h2Criar">Criar Aula</h2>
                    <label>Data:</label>
                    <input

                        type="date"
                        value={data}
                        onChange={e => setData(e.target.value)}
                    />

                    <label>Horário:</label>
                    <input
                        type="time"
                        value={horario}
                        onChange={e => setHorario(e.target.value)}
                    />

                    <label>Tipo de Aula:</label>
                    <select
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        <option value="Jiu-Jitsu">Jiu-Jitsu</option>
                        <option value="Muay Thai">Muay Thai</option>
                        <option value="No-Gi">No-Gi</option>
                    </select>

                    <button className="btnAula" onClick={criarAula}>
                        Criar Aula
                    </button>
                </div>
            </section>
        </>
    );
}
