const Aluno = require('../Models/alunos')

async function criarAluno(dados) {
    const alunoExistente = await Aluno.findOne({ email: dados.email })
    if (alunoExistente) throw new Error("Já existe um aluno com esse E-mail")

    const cpfExistente = await Aluno.findOne({ cpf: dados.cpf })
    if (cpfExistente) throw new Error("Já existe um aluno com esse CPF")


    if (!dados.modalidade) {
        throw new Error("Selecione uma modalidade")
    }

    if (dados.modalidade === 'Muay Thai') {
        dados.faixa = 'N/A'
    } else if (!dados.faixa) {
        throw new Error("Selecione uma faixa")
    }
    if (dados.modalidade?.toLowerCase() === 'muay thai') {
        dados.faixa = 'N/A';
    }

    const novoAluno = new Aluno({
        name: dados.name,
        idade: dados.idade,
        email: dados.email,
        telefone: dados.telefone,
        cpf: dados.cpf,
        faixa: dados.faixa,
        resMedic: dados.resMedic,
        mensalidade: dados.mensalidade,
        modalidade: dados.modalidade,
        pago: dados.pago

    })



    return await novoAluno.save()
}

async function listarAlunos() {
    return await Aluno.find()
}
async function buscarAlunoPorId(id) {

    return await Aluno.findById(id)
}
async function atualizarAluno(id, dados) {
    return await Aluno.findByIdAndUpdate(id, dados, { new: true })
}
async function deletarAluno(id) {
    return await Aluno.findByIdAndDelete(id)
}
module.exports = {
    criarAluno,
    listarAlunos,
    buscarAlunoPorId,
    atualizarAluno,
    deletarAluno
};