import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import { Footer } from './components/Footer/footer'
import Dashboard from './pages/Dashboard/Dashboard'



function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
