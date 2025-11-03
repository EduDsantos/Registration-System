import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import './calendario.css';
import axios from 'axios';
import api from "../../services/api"

export default function Calendario() {
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [tipo, setTipo] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [selecionados, setSelecionados] = useState([]);

  useEffect(() => {

    api.get("/alunos")
      .then(res => setAlunos(res.data))
      .catch(err => console.error(err));
  }, []);

  function toggleAluno(id) {
    setSelecionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }

  async function Gerar() {
    const alunosPresentes = alunos
      .filter(a => selecionados.includes(a._id))
      .map(a => ({ id: a._id, nome: a.nome }));

    await api.post("/aulas", {
      data, horario, tipo, alunosPresentes
    });

    alert("Aula criada com sucesso!");
  }

  return (
    <>
      <Header />
      <div className="calendario-container">
        <h1>Calendário de Aulas</h1>

        <div className="form-calendario">
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

          <h3>Selecionar Alunos Presentes:</h3>
          {alunos.map(a => (
            <label key={a._id}>
              <input
                type="checkbox"
                checked={selecionados.includes(a._id)}
                onChange={() => toggleAluno(a._id)}
              />
              {a.nome}
            </label>
          ))}

          <button className="btnAula" onClick={Gerar}>Gerar Aula</button>
        </div>
      </div>
    </>
  );
}
