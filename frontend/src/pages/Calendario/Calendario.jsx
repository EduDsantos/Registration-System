import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import './calendario.css';
import api from "../../services/api"
import apiPublic from '../../services/apiPublic';

export default function Calendario() {
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [tipo, setTipo] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [selecionados, setSelecionados] = useState([]);


  useEffect(() => {
    const fetchAlunos = async () => {
      try {

        const response = await api.get('/alunos')

        setAlunos(response.data)
      } catch (error) {
        console.log('Erro ao buscar alunos:', error)
      }
    }

    fetchAlunos()
  }, [])

  async function Gerar() {
    try {
      const alunosPresentes = alunos
        .filter(a => selecionados.includes(a._id))
        .map(a => ({ id: a._id, name: a.name }));

      const response = await api.post("/aula", {
        data, horario, tipo, alunosPresentes
      });

      console.log("Resposta da API:", response.data);
      alert("Aula criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar aula:", error.response?.data || error.message);
      alert("Erro ao criar aula. Verifique o console para mais detalhes.");
    }
  }


  return (
    <>
      <Header />
      <h1 className='h1Calendario'>Calendário de Aulas</h1>
      <section className="main-content">
        <div className="calendario-container">
          <div className="form-calendario">
            <h2 className='h2Criar'>Criar Aula</h2>
            <label>Data:</label>
            <input type="date" value={data} onChange={e => setData(e.target.value)} />
            <label>Horário:</label>
            <input type="time" value={horario} onChange={e => setHorario(e.target.value)} />
            <label>Tipo de Aula:</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="">Selecione</option>
              <option value="Jiu-Jitsu">Jiu-Jitsu</option>
              <option value="Muay Thai">Muay Thai</option>
              <option value="Boxe">Boxe</option>
            </select>
            <button className="btnAula" onClick={Gerar}>Gerar Aula</button>
          </div>
        </div>

        <section className='Alunos-content'>

          <h2 className='h2Presentes'>Alunos Presentes</h2>
          <table className='Alunos-presentes'>
            <thead className='container-vertical'>
              <tr>
                <th>Nome</th>
                <th>Faixa</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody className='container-alunos'>
              {alunos.map((aluno) => (
                <tr key={aluno._id}>
                  <td data-label="Nome">{aluno.name}</td>
                  <td data-label="Faixa">{aluno.faixa}</td>
                  <td data-label="Acoes">
                    <button className='btnPresensa' onClick={() => MarcarPresenca(aluno._id)}>Presença</button>
                    <button className='btnPresensa' onClick={() => MarcarFalta(aluno._id)}>Falta</button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </section>
      </section>


    </>
  );
}
