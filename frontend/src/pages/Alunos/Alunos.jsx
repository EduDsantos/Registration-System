import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Alunos.css'
import Header from '../../components/Header/Header'
import { useNavigate, useParams } from 'react-router-dom'





export default function Alunos() {
    const [alunos, setAlunos] = useState([])
    const [mensagem, setMensagem] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:5000/alunos/', {
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

    const navigate = useNavigate()

    const DeletarAluno = async (id) => {
        console.log("tentando deletar o id:", id)
        const confirmar = window.confirm("Você tem certeza que deseja excluir esse aluno?")
        if (!confirmar) return
        try {
            const token = localStorage.getItem('token')

            if (!id) {
                setMensagem("id nao econtrado")
                return
            }

            await axios.delete(`http://localhost:5000/alunos/deletar/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setMensagem("Aluno deletado com sucesso!")
            setTimeout(() => {
                setMensagem('')
            }, 3000)
            setAlunos(prev => prev.filter(a => a._id !== id))
        } catch (err) {
            setMensagem("Erro ao deletar aluno")
            console.log(err)
            setTimeout(() => {
                setMensagem('')
            }, 3000)
        }

    }



    const CadastrarAluno = () => {
        navigate('/cadastrar')
    }

    const EditarAluno = (id) => {
        navigate(`/editar/${id}`)
    }


    if (loading) return <p> Carregando... </p>

    return (
        <div className='container'>
            <Header />
            <div className='main-container'>
                <h2>Lista de Alunos</h2>
                {alunos.length === 0 ? (
                    console.log('')
                ) : (
                    <table className="tabela-container">
                        <thead className="container-vertical">
                            <tr>
                                <th>cpf</th>
                                <th>Nome</th>
                                <th>Idade</th>
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
                                        <td>{aluno.idade}</td>
                                        <td>{aluno.faixa}</td>
                                        <td>{aluno.status}</td>
                                        <td>
                                            <button onClick={() => EditarAluno(aluno._id)}>Editar</button>
                                            <button onClick={() => DeletarAluno(aluno._id)}>Excluir</button>
                                        </td>
                                    </tr>

                                );
                            })}
                        </tbody>
                    </table>
                )}
                (<button className='btnCadastrar' onClick={CadastrarAluno}>Cadastrar aluno</button>)
            </div>
        </div>
    );
};
