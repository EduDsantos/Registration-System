import React, { useState } from 'react'
import api from '../../services/api'
import './Login.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setErro('')

        try {
            const res = await api.post('/treinador/login', { email, senha })
            console.log(email, senha)
            const token = res.data.token
            localStorage.setItem('token', token)
            navigate('/dashboard')

        } catch (err) {
            setErro(err.response?.data?.message || 'Erro ao fazer login')
        }

    }

    return (
        <div className="Container">
            <form className='LoginContainer' onSubmit={handleLogin}>
                <div className="form-container">
                    <div className='input-value'>
                        <label>Email:   </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu Email" />
                    </div>
                    <div className="input-value">
                        <label>Senha:</label>
                        <input type="password" id='' value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua Senha" />
                    </div>
                    <div className='btn-container'>
                        <button className='btnClass' type="submit" >Entrar</button>
                    </div>
                </div>
                {/* {erro && <p style={{ color: 'red' }}>{erro}</p>} */}
            </form>
        </div>

    )
}