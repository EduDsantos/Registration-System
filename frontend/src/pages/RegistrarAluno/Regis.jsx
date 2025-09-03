import { useState } from 'react'
import apiPublic from '../../services/apiPublic'
import './regis.css'
import Header from '../../components/Header/Header'
import { Navigate, useNavigate } from 'react-router-dom'


export default function RegistrarAluno() {

    const [mensagemSucess, setMensagemSucess] = useState('')
    const [mensagemErro, setMensagemErro] = useState('')

    const [form, setForm] = useState({
        name: '',
        idade: '',
        email: '',
        telefone: '',
        cpf: '',
        faixa: '',
        resMedic: '',
        mensalidade: '',
    })



    function formatarDatas(dateString) {
        return dateString ? dateString.split('T')[0] : ''

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        // const navigate = useNavigate()

        if (!form.faixa) {
            setMensagemErro("Selecione uma faixa")
        }
        try {

            const dadosConvert = {
                ...form,
                idade: Number(form.idade),
                mensalidade: Number(form.mensalidade)
            }


            await apiPublic.post('/alunos/cadastrar', dadosConvert)

            setMensagemSucess('Aluno cadastrado com sucesso!')
            setTimeout(() => {
                setMensagemSucess('')
                // navigate('./alunos')
            }, 3000)

        } catch (err) {
            if (err.response && err.response && err.response.data.erro) {
                setMensagemErro(err.response.data.erro)
            } else {
                console.error(err)
                setMensagemErro('Erro ao cadastrar aluno!')

                setTimeout(() => {
                    setMensagemErro('');
                }, 3000);
            }

        }
    }


    const Navigate = useNavigate()
    const alunos = () => {
        Navigate('/alunos')
    }

    function validarTell(telefone) {
        let numero = telefone.replace(/\D/g, '')
        return numero
    }

    return (

        <div className='main-container'>
            <Header />
            <h2>Registrar Aluno</h2>
            <button onClick={alunos}>Voltar</button>

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
                <input type="text" name='telefone' value={validarTell(form.telefone)} onChange={handleChange} placeholder='telefone' maxLength={11} required />

                <label>CPF</label>
                <input type="text" name='cpf' value={form.cpf.replace(/\D/g, '')} onChange={handleChange} placeholder='CPF' required />

                <label>faixa</label>
                <select name='faixa' value={form.faixa} onChange={handleChange}>
                    <option onChange={handleChange} value=''>faixa</option>
                    <option value='cinza'>Cinza</option>
                    <option value='branca'>Branca</option>
                    <option value='cinzaBranca'>Cinza e Branca</option>
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
                <input type="number" name='mensalidade' value={form.mensalidade} onChange={handleChange} placeholder='Mensalidade' required />

                <label>Data de Cadastro</label>
                <input type="Date" name='dataCadastro' value={formatarDatas(form.dataCadastro)} onChange={handleChange} placeholder='Data de Cadastro' />

                <label>Data de Pagamento</label>
                <input type="Date" name='dataPagamento' value={formatarDatas(form.dataPagamento)} onChange={handleChange} placeholder='dataPagamento' required />

                <label>Restrição Medica</label>
                <textarea name='resMedic' value={form.resMedic} onChange={handleChange}></textarea>

                <button className='btnSub' type='submit'>Cadastrar</button>

            </form>
        </div >
    )



}