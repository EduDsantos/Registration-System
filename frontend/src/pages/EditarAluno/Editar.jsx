import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import api from '../../services/api'
import './editar.css'
import Header from '../../components/Header/Header'
import apiPublic from '../../services/apiPublic'

const EditarAluno = () => {
    const { id } = useParams()
    const navigate = useNavigate()

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

    const [mensagemErro, setMensagemErro] = useState('')
    const [mensagemSucess, setMensagemSucess] = useState('')

    useEffect(() => {
        const fetchAlunos = async () => {
            try {

                const response = await apiPublic.get(`/alunos/${id}`)
                setForm(response.data)

            } catch (err) {
                console.error(err)
                setMensagemErro('Erro ao carregar alunos')
                setTimeout(() => {
                    setMensagemErro('')
                }, 2000)
            }
        }
        fetchAlunos()
    }, [id])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            await apiPublic.put(`alunos/editar/${id}`, form)

            setMensagemSucess('Aluno atualizado com sucesso!')
            setTimeout(() => {
                setMensagemErro('')
                navigate('/alunos')
            }, 2000)
        } catch (err) {
            console.error(err)
            setMensagemErro('Erro ao tentar atualizar aluno')
            setTimeout(() => {
                setMensagemErro('')
            }, 3000)
        }
    }

    function formatarDatas(dateString) {
        return dateString ? dateString.split('T')[0] : ''

    }


    const Alunos = () => {
        navigate('/alunos')
    }
    return (

        <div className='main-container-Edit'>
            <Header />
            <h2>Editar Aluno</h2>
            <button onClick={Alunos} class="btnSair">Voltar</button>

            {mensagemSucess && <p style={{ color: 'green' }} >{mensagemSucess}</p>}
            {mensagemErro && <p style={{ color: 'red' }}> {mensagemErro}</p>}
            <form onSubmit={handleSubmit} className='formRegis-container'>
                <label>Nome</label>
                <input type="text" name='name' value={form.name} onChange={handleChange} placeholder='Nome' required />

                <label>Idade</label>
                <input type="number" name='idade' value={form.idade} onChange={handleChange} placeholder='Idade' required />

                <label>Email</label>
                <input type="email" name='email' value={form.email} onChange={handleChange} placeholder='email' required />

                <label>telefone</label>
                <input type="number" name='telefone' value={form.telefone} onChange={handleChange} placeholder='telefone' required />

                <label>CPF</label>
                <input type="text" name='cpf' value={form.cpf} onChange={handleChange} placeholder='CPF' required />

                <label>faixa</label>
                <select name='faixa' value={form.faixa} onChange={handleChange}>
                    <option>Branca</option>
                    <option>Cinza e Branca</option>
                    <option>Cinza</option>
                    <option>Cinza e Preta</option>
                    <option>Cinza e Amarela</option>
                    <option>Amarela</option>
                    <option>Amarela e Preta</option>
                    <option>Laranja e Branca</option>
                    <option>Laranja</option>
                    <option>Laranja e Preta</option>
                    <option>Verde e Branca</option>
                    <option>Verde</option>
                    <option>Verde e Preta</option>
                    <option>Azul</option>
                    <option>Roxa</option>
                    <option>Marrom</option>
                    <option>Preta</option>
                    <option>Vermelha e Preta</option>
                    <option>Vermelha e Branca</option>
                    <option>Vermelha</option>
                </select>


                <label>Mensalidade</label>
                <input type="number" name='mensalidade' value={form.mensalidade} onChange={handleChange} placeholder='Mensalidade' required />

                <label>Data de Cadastro</label>
                <input type="Date" name='dataCadastro' value={formatarDatas(form.dataCadastro)} onChange={handleChange} placeholder='Data de Cadastro' required />

                <label>Data de Pagamento</label>
                <input type="Date" name='dataPagamento' value={formatarDatas(form.dataPagamento)} onChange={handleChange} placeholder='dataPagamento' required />

                {/* <label>Restrição Medica</label>
                <textarea name='resMedic' value={form.resMedic} onChange={handleChange}></textarea> */}
                <button className='btnSub' type='submit'>Salvar alteração</button>

            </form>
        </div>
    )




}
export default EditarAluno


