import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import Header from '../../components/Header/Header';
import './pagamentoPainel.css'

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [abaAtiva, setAbaAtiva] = useState("pendentes") // 👉 controla qual aba está ativa

  useEffect(() => {
    fetchPagamentos()
  }, [])

  const fetchPagamentos = async () => {
    try {
      const response = await api.get('/pagamentos')
      setPagamentos(response.data)
    } catch (error) {
      console.error('Erro ao buscar pagamentos', error)
    } finally {
      setLoading(false)
    }
  }

  const marcarComoPago = async (id) => {
    try {
      await api.put(`/pagamentos/${id}/pagar`)
      fetchPagamentos()
    } catch (error) {
      console.error('Erro ao marcar como pago', error)
    }
  }


  const deletarPagamento = async (id) => {
    try {
      await api.delete(`/pagamentos/${id}`)
      fetchPagamentos()
    } catch (error) {
      console.error('Erro ao tentar deletar pagamento', error)
    }
  }


  const desmarcarPago = async (id) => {
    try {
      await api.put(`/${id}/desmarcar`)
      fetchPagamentos()
    } catch (error) {
      console.error('Erro ao desmarcar pagamento', error)
    }
  }

  if (loading) return <p>Carregando pagamentos...</p>


  const pendentes = pagamentos.filter(p => p.status === "pendente")
  const pagos = pagamentos.filter(p => p.status === "pago")

  return (
    <div className="dashboard-container">
      <Header />
      <div className='main-container'>
        <h2>Painel de Pagamentos</h2>


        <div className="tabs">
          <button
            className={abaAtiva === "pendentes" ? "tab active" : "tab"}
            onClick={() => setAbaAtiva("pendentes")}
          >
            Pendentes
          </button>
          <button
            className={abaAtiva === "historico" ? "tab active" : "tab"}
            onClick={() => setAbaAtiva("historico")}
          >
            Histórico
          </button>
        </div>

        {/* Conteúdo da aba */}
        {abaAtiva === "pendentes" && (
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
              {pendentes.map((pagamento) => (
                <tr key={pagamento._id}>
                  <td>{pagamento.alunoId?.name || 'Desconhecido'}</td>
                  <td>R$ {pagamento.valor}</td>
                  <td>{pagamento.status}</td>
                  <td>{new Date(pagamento.dataVencimento).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => marcarComoPago(pagamento._id)}>
                      Marcar como pago
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {abaAtiva === "historico" && (
          <table className='table-container'>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Data de Pagamento</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((pagamento) => (
                <tr key={pagamento._id}>
                  <td>{pagamento.alunoId?.name || 'Desconhecido'}</td>
                  <td>R$ {pagamento.valor}</td>
                  <td>{pagamento.status}</td>
                  <td>{pagamento.dataPagamento ? new Date(pagamento.dataPagamento).toLocaleDateString() : '-'}</td>
                  <td>
                    <button onClick={() => desmarcarPago(pagamento._id)}>
                      Desmarcar
                    </button>
                    <button onClick={() => deletarPagamento(pagamento._id)}>
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
