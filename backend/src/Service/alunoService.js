const Aluno = require('../Models/alunos')

async function criarAluno(dados) {
    const alunoExistente = await Aluno.findOne({ email: dados.email })
    if (alunoExistente) throw new Error("Já existe um aluno com esse E-mail")


    const novoAluno = new Aluno({
        name: '',
        idade: '',
        email: '',
        telefone: '',
        cpf: '',
        faixa: '',
        resMedic: '',
        mensalidade: '',
        dataCadastro: '',
        dataPagamento: '',
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