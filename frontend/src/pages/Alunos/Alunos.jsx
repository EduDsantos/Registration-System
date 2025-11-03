import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import './Alunos.css'
import Header from '../../components/Header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import apiPublic from '../../services/apiPublic'


export default function Alunos() {
    const [alunos, setAlunos] = useState([])
    const [mensagem, setMensagem] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAlunos = async () => {
            try {

                const response = await api.get('/alunos')

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

            await apiPublic.delete(`/alunos/deletar/${id}`)
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


    function formatCpf(value) {
        const cpf = value.replace(/\D/g, '');

        if (cpf.length === 11) {
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
        }

    }
    function formatarCell(celular) {
        if (!celular) return "";


        let limparValores = celular.toString().replace(/\D/g, "").substring(0, 11);
        let numerosArray = limparValores.split("");
        let numeroFormatado = "";

        if (numerosArray.length > 0) {
            numeroFormatado += `(${numerosArray.slice(0, 2).join("")})`;
        }

        if (numerosArray.length > 2) {
            numeroFormatado += ` ${numerosArray.slice(2, 7).join("")}`;
        }

        if (numerosArray.length > 7) {
            numeroFormatado += `-${numerosArray.slice(7, 11).join("")}`;
        }

        return numeroFormatado;
    }


    if (loading) return <p> Carregando... </p>

    return (
        <div className='dashboard-container'>
            <Header />
            <div className='main-container'>
                <h2>Lista de Alunos</h2>
                <button className='btnCadastrar' onClick={CadastrarAluno}>Cadastrar aluno</button>
                {alunos.length === 0 ? (
                    console.log('')
                ) : (
                    <table className="tabela-container">
                        <thead className="container-vertical">
                            <tr>
                                <th>Cpf</th>
                                <th>Telefone</th>
                                <th>Nome</th>
                                <th>Idade</th>
                                <th>Faixa</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody className="container-horizontal">
                            {alunos.map((aluno) => (
                                <tr key={aluno._id}>
                                    <td data-label="CPF">{formatCpf(aluno.cpf)}</td>
                                    <td data-label="Telefone">{formatarCell(aluno.telefone)}</td>
                                    <td data-label="Nome">{aluno.name}</td>
                                    <td data-label="Idade">{aluno.idade}</td>
                                    <td data-label="Faixa">{aluno.faixa}</td>
                                    <td data-label="Email">{aluno.email}</td>
                                    <td data-label="Ações">
                                        <button onClick={() => EditarAluno(aluno._id)}>Editar</button>
                                        <button onClick={() => DeletarAluno(aluno._id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                
            </div>
        </div>
    );
};
