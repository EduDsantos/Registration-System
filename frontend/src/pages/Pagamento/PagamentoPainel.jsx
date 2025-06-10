import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header/Header';
import './pagamentoPainel.css'

export default function Pagamentos() {
    const [pagamentos, setPagamento] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPagamentos()
    }, [])
    const fetchPagamentos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/pagamentos')
            // console.log('Dados recebidos:', response.data);
            setPagamento(response.data.pagamentos)
        } catch (error) {
            console.error('Erro ao buscar pagamentos', error)
        } finally {
            setLoading(false)
        }
    }
    if (loading) return <p> Carregando... </p>



    const marcarComoPago = async (id) => {
        // console.log("ID enviado,", id)

        try {
            const response = await axios.put(`http://localhost:5000/pagamentos/${id}/pagar`)
            fetchPagamentos(response.data)
        } catch (error) {
            console.error('Erro ao marcar como pago', error)
        }
    }

    if (loading) {
        return <p>Carregando pagamentos...</p>
    }

    const desmarcarPago = async (id) => {
        // console.log("ID enviado,", id)
        try {
            const response = await axios.put(`http://localhost:5000/pagamentos/${id}/desmarcar`)
            fetchPagamentos(response.data)
        } catch (error) {
            console.error('Erro ao marcar como pago', error)
        }
    }

    if (loading) {
        return <p>Carregando pagamentos...</p>
    }


    return (

        <div className="main-container">
            <Header />
            <div className='container'>
                <h2>painel de pagamento</h2>
                <table className='table-container'>
                    <thead>
                        <tr>
                            <th>Aluno</th>
                            <th>Valor</th>
                            <th>Status</th>
                            <th>Data de Vencimento</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagamentos.map((pagamento) => {
                            return (
                                <tr key={pagamento._id}>
                                    <td>{pagamento.alunoId?.name || 'Desconhecido'}</td>
                                    <td>R$ {pagamento.valor}</td>
                                    <td>{pagamento.status}</td>
                                    <td>{new Date(pagamento.dataVencimento).toLocaleDateString()}</td>
                                    <td>
                                        {pagamento.status !== 'pago' && (
                                            <button onClick={() => marcarComoPago(pagamento._id)}>
                                                Marcar como pago
                                            </button>
                                        )}
                                        
                                            {pagamento.status === 'pago' && (
                                                <button onClick={() => desmarcarPago(pagamento._id)}>
                                                    Desmarcar
                                                </button>
                                            )}
                                        
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )



}

