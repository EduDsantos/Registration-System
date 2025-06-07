const Aluno = require('../Models/alunos')

async function criarAluno(dados) {
    const alunoExistente = await Aluno.findOne({ email: dados.email })
    if (alunoExistente) throw new Error("Já existe um aluno com esse E-mail")


    const novoAluno = new Aluno({
        name: dados.name,
        idade: Number(dados.idade),
        email: dados.email,
        telefone: dados.telefone,
        cpf: dados.cpf,
        faixa: dados.faixa,
        resMedic: dados.resMedic,
        mensalidade: Number(dados.mensalidade),
        dataCadastro: new Date(dados.dataCadastro),
        dataPagamento: new Date(dados.dataPagamento)
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