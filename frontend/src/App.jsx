import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import { Footer } from './components/Footer/footer'
import Dashboard from './pages/Dashboard/Dashboard'
import Alunos from './pages/Alunos/Alunos'
import Pagamentos from './pages/Pagamento/PagamentoPainel'
import RegistrarAluno from './pages/RegistrarAluno/Regis'
import EditarAluno from './pages/EditarAluno/Editar'
import DeletarAluno from './pages/Alunos/Alunos'

import CriarAula from './pages/CriarAula/CriarAula'
import PresencasAula from './pages/PresencasAula/PrensecaAula'
import Aulas from './pages/listaAulas/Aulas'



function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route path="/cadastrar" element={<RegistrarAluno />} />
        <Route path="/editar/:id" element={<EditarAluno />} />
        <Route path="/deletar/:id" element={<DeletarAluno />} />
        <Route path="/aula" element={<CriarAula />} />
        <Route path="/aula/:id/presencas" element={<PresencasAula />} />
        <Route path="/aulas" element={<Aulas />} />

      </Routes>
      <Footer />

    </BrowserRouter>
  )
}

export default App
