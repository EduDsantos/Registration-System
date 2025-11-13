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
        modalidade: '',
    })



    function formatarDatas(dateString) {
        return dateString ? dateString.split('T')[0] : ''

    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
            ...(name === 'modalidade' && value === 'Muay Thai' ? { faixa: 'N/A' } : {}),
            ...(name === 'modalidade' && value !== 'Muay Thai' ? { faixa: '' } : {})
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (form.modalidade !== 'Muay Thai' && !form.faixa) {
            setMensagemErro("Selecione uma faixa");
            return;
        }

        try {

            const dadosConvert = {
                ...form,
                idade: Number(form.idade),
                mensalidade: Number(form.mensalidade),
            };


            await apiPublic.post('/alunos/cadastrar', dadosConvert);

            setMensagemSucess('Aluno cadastrado com sucesso!');
            setTimeout(() => setMensagemSucess(''), 3000);
        } catch (err) {
            if (err.response?.data?.erro) {
                setMensagemErro(err.response.data.erro);
            } else {
                console.error(err);
                setMensagemErro('Erro ao cadastrar aluno!');
            }

            setTimeout(() => setMensagemErro(''), 3000);
        }
    };



    const Navigate = useNavigate()
    const alunos = () => {
        Navigate('/alunos')
    }

    function validarTell(telefone) {
        let numero = telefone.replace(/\D/g, '')
        return numero
    }

    return (

        <div className='main-container-Regis'>
            <Header />
            <h2>Registrar Aluno</h2>
            <button onClick={alunos} className='btnSair'>Voltar</button>

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

                <label>Modalidade</label>
                <select name='modalidade' value={form.modalidade} onChange={handleChange}>
                    <option onChange={handleChange} value=''>modalidade</option>
                    <option value='Jiu-Jitsu'>Jiu-Jitsu</option>
                    <option value='Muay Thai'>Muay Thai</option>
                    <option value='No-gi'>No-gi</option>
                </select>

                <label>faixa</label>


                <select
                    name="faixa"
                    value={form.faixa}
                    onChange={handleChange}
                    disabled={form.modalidade === 'Muay Thai'}
                    className={form.modalidade === 'Muay Thai' ? 'disabled-select' : ''}
                >
                    <option onChange={handleChange} value={form.faixa}>faixa</option>
                    <option value='branca'>Branca</option>
                    <option value='azul'>Azul</option>
                    <option value='roxa'>Roxa</option>
                    <option value='marrom'>Marrom</option>
                    <option value='preta'>Preta</option>
                </select>



                <label>Mensalidade</label>
                <input type="number" name='mensalidade' value={form.mensalidade} onChange={handleChange} placeholder='Mensalidade' required />



                <label>Data de Cadastro</label>
                <input type="Date" name='dataCadastro' value={formatarDatas(form.dataCadastro)} onChange={handleChange} placeholder='Data de Cadastro' />

                <label>Data de Pagamento</label>
                <input type="Date" name='dataPagamento' value={formatarDatas(form.dataPagamento)} onChange={handleChange} placeholder='dataPagamento' required />

                {/* <label>Restrição Medica</label>
                <textarea name='resMedic' value={form.resMedic} onChange={handleChange}></textarea> */}

                <button className='btnSub' type='submit'>Cadastrar</button>

            </form>
        </div >
    )



}