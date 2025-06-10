import { useState } from 'react'
import axios from 'axios'
import './regis.css'
import Header from '../../components/Header/Header'
import { Navigate, useNavigate } from 'react-router-dom'


export default function RegistrarAluno() {

    const [mensagem, setMensagem] = useState('')

    const [form, setForm] = useState({
        name: '',
        idade: '',
        email: '',
        telefone: '',
        cpf: '',
        faixa: '',
        resMedic: '',
        mensalidade: '',
        dataCadastro: '',
        dataPagamento: ''
    })

    function formatarDatas(dateString) {
        return dateString ? dateString.split('T')[0] : ''

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const payload = {
        ...form,
        idade: Number(form.idade),
        mensalidade: Number(form.mensalidade),
        dataCadastro: form.dataCadastro ? new Date(form.dataCadastro) : undefined,
        dataPagamento: form.dataPagamento ? new Date(form.dataPagamento) : undefined
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const token = localStorage.getItem('token')
            await axios.post('http://localhost:5000/cadastrar', form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setMensagem('Aluno cadastrado com sucesso!')
            setTimeout(() => {
                setMensagem('')
            }, 3000)

            setForm({
                name: '',
                idade: '',
                email: '',
                telefone: '',
                cpf: '',
                faixa: '',
                resMedic: '',
                mensalidade: '',
                dataCadastro: '',
                dataPagamento: ''

            })

        } catch (err) {
            console.error(err)
            setMensagem('Erro ao cadastrar aluno!')

            setTimeout(() => {
                setMensagem('');
            }, 3000);
        }
    }
    const navigate = useNavigate()
    const Alunos = () => {
        navigate('/alunos')
    }




    return (

        <div className='main-container'>
            <Header />
            <h2>Registrar Aluno</h2>
            <button onClick={Alunos}>Voltar</button>

            {mensagem && <div className='mensagem'>{mensagem}</div>}
            <form onSubmit={handleSubmit} className='formRegis-container'>
                <label>Nome</label>
                <input type="text" name='name' value={form.name} onChange={handleChange} placeholder='Nome' required />


                <label>Idade</label>
                <input type="number" name='idade' value={payload.form.idade} onChange={handleChange} placeholder='Idade' required />

                <label>Email</label>
                <input type="email" name='email' value={form.email} onChange={handleChange} placeholder='email' required />

                <label>telefone</label>
                <input type="text" name='telefone' value={form.telefone} onChange={handleChange} placeholder='telefone' required />

                <label>CPF</label>
                <input type="text" name='cpf' value={payload.form.cpf.replace(/\D/g, '')} onChange={handleChange} placeholder='CPF' required />

                <label>faixa</label>
                <select name='faixa' value={form.faixa} onChange={handleChange}>
                    <option value='branca'>Branca</option>
                    <option value='cinzaBranca'>Cinza e Branca</option>
                    <option value='cinza'>Cinza</option>
                    <option value='cinzaPreta'>Cinza e Preta</option>
                    <option value='cinzaAmarela'>Cinza e Amarela</option>
                    <option value='amarela'>Amarela</option>
                    <option value='amarelaPreta'>Amarela e Preta</option>
                    <option value='laranjaBranca'>Laranja e Branca</option>
                    <option value='laranja'>Laranja</option>
                    <option value='laranjaPreta'>Laranja e Preta</option>
                    <option value='verdeBranca'>Verde e Branca</option>
                    <option value='verde'>Verde</option>
                    <option value='verdePreta'>Verde e Preta</option>
                    <option value='azul'>Azul</option>
                    <option value='roxa'>Roxa</option>
                    <option value='marrom'>Marrom</option>
                    <option value='preta'>Preta</option>
                    <option value='vermelhaPreta'>Vermelha e Preta</option>
                    <option value='vermelhaBranca'>Vermelha e Branca</option>
                    <option value='vermelha'>Vermelha</option>
                </select>


                <label>Mensalidade</label>
                <input type="number" name='mensalidade' value={payload.form.mensalidade} onChange={handleChange} placeholder='Mensalidade' required />

                <label>Data de Cadastro</label>
                <input type="Date" name='dataCadastro' value={formatarDatas(payload.form.dataCadastro)} onChange={handleChange} placeholder='Data de Cadastro' />

                <label>Data de Pagamento</label>
                <input type="Date" name='dataPagamento' value={formatarDatas(payload.form.dataPagamento)} onChange={handleChange} placeholder='dataPagamento' required />

                <label>Restrição Medica</label>
                <textarea name='resMedic' value={payload.form.resMedic} onChange={handleChange}></textarea>

                <button className='btnSub' type='submit'>Cadastrar</button>

            </form>
        </div>
    )



}