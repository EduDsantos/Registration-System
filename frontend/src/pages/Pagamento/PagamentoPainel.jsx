import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import Header from '../../components/Header/Header';
import './pagamentoPainel.css'

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [abaAtiva, setAbaAtiva] = useState("pendentes")
  const [mensagem, setMensagem] = useState('')
  const [loadingId, setLoadingId] = useState(null) // id em processamento

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
    const confirmar = window.confirm("Deseja realmente marcar este pagamento como pago?");
    if (!confirmar) return;

    try {
      setLoadingId(id)
      await api.put(`/pagamentos/${id}/pagar`)
      setMensagem("Pagamento marcado como pago com sucesso!")
      setTimeout(() => setMensagem(''), 3000)
      fetchPagamentos()
    } catch (error) {
      console.error('Erro ao marcar como pago', error)
    } finally {
      setLoadingId(null)
    }
  }

  const deletarPagamento = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este pagamento?")) return;

    try {
      await api.delete(`/pagamentos/${id}`)
      fetchPagamentos()
    } catch (error) {
      console.error('Erro ao tentar deletar pagamento', error)
    }
  }

  const desmarcarPago = async (id) => {
    if (!window.confirm("Deseja realmente reverter este pagamento para pendente?")) return;

    try {
      await api.put(`/pagamentos/${id}/desmarcar`)
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
        {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}

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

        {/* Pendentes */}
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
                  <td>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                      {pagamento.status}
                    </span>
                  </td>
                  <td>{new Date(pagamento.dataVencimento).toLocaleDateString()}</td>
                  <td>
                    <button
                      disabled={loadingId === pagamento._id}
                      onClick={() => marcarComoPago(pagamento._id)}
                      style={{
                        background: loadingId === pagamento._id ? '#ccc' : '#4CAF50',
                        color: 'white',
                        padding: '6px 10px',
                        borderRadius: '5px',
                        cursor: loadingId === pagamento._id ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {loadingId === pagamento._id ? 'Processando...' : 'Marcar como pago'}
                    </button>
                    <button
                      onClick={() => deletarPagamento(pagamento._id)}
                      style={{ marginLeft: '8px', background: '#f44336', color: 'white' }}
                    >
                      Deletar
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
                  <td>
                    <span style={{ color: 'green', fontWeight: 'bold' }}>
                      {pagamento.status}
                    </span>
                  </td>
                  <td>{pagamento.dataPagamento ? new Date(pagamento.dataPagamento).toLocaleDateString() : '-'}</td>
                  <td>
                    <button
                      onClick={() => desmarcarPago(pagamento._id)}
                      style={{ background: '#ff9800', color: 'white' }}
                    >
                      Reverter
                    </button>
                    <button
                      onClick={() => deletarPagamento(pagamento._id)}
                      style={{ marginLeft: '8px', background: '#f44336', color: 'white' }}
                    >
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
