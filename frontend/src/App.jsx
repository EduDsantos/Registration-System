import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import { Footer } from './components/Footer/footer'
import Dashboard from './pages/Dashboard/Dashboard'
import Alunos from './pages/Alunos/Alunos'



function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/alunos" element={<Alunos />} />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
