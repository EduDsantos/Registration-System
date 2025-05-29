import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Alunos.css'
import Header from '../../components/Header/Header'




export default function Alunos() {
    const [alunos, setAlunos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:3000/alunos', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setAlunos(response.data)
            } catch (error) {
                console.log('Erro ao buscar alunos:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAlunos()
    }, [])
    if (loading) return <p> Carregando... </p>

    return (
        <div>
            <Header />

            <h2>Lista de Alunos</h2>
            {alunos.length === 0 ? (
                <p>Nenhum aluno cadastrado</p>
            ) : (
                <table className="tabela-Container" border="1">
                    <thead className="container-vertical">
                        <tr>
                            <th>cpf</th>
                            <th>Nome</th>
                            <th>Faixa</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody className="container-horizontal">
                        {alunos.map((aluno) => {
                            console.log(aluno)

                            return (
                                <tr key={aluno.cpf}>
                                    <td>{aluno.cpf}</td>
                                    <td>{aluno.name}</td>
                                    <td>{aluno.faixa}</td>
                                    <td>{aluno.status}</td>
                                    <td>
                                        <button>Editar</button>
                                        <button>Excluir</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            )}
        </div>
    );
};
