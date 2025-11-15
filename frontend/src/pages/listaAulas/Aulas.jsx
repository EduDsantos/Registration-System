import Header from "../../components/Header/Header"
import { useEffect, useState } from "react"
import "./aulas.css"
import api from "../../services/api"


export default function Aulas() {

    const [aulas, setAulas] = useState([])

    useEffect(() => {
        async function fetchAulas() {
            try {
                const response = await api.get("/aulas")
                console.log("RESPOSTA DO BACKEND:", response.data.aulas)

                setAulas(response.data.aulas)
                
            } catch (error) {
                console.error("Erro ao buscar aulas:", error)
            }
        }
        fetchAulas()
    }, [])




    return (
        <section className="aulasMain">
            <Header />

            <div className="cardsAulas">
                <table className="tabela-aulas">
                    <thead>
                        <tr>
                            <th>Modalidade</th>
                            <th>Data</th>
                            <th>Presentes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aulas.map((aula) => (
                            <tr key={aula._id}>
                                <td>{aula.tipo}</td>

                                <td>
                                    {new Date(aula.data).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </td>

                                <td>{aula.alunosPresentes?.length || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>



        </section>

    )

}







