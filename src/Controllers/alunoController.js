const alunoService = require('../Service/alunoService')
const authService = require('../Service/authService')

async function criar(req, res) {

   

    try {
        const aluno = await alunoService.criarAluno(req.body)
        res.status(200).json(aluno)
        const {authorization} = req.headers
        console.log(authorization)
    } catch (error) {
        res.status(400).json({ erro: error.message })
    }
}

async function listar(req, res) {
    const alunos = await alunoService.listarAlunos()
    res.json(alunos)
}

async function buscarPorId(req, res) {
    const aluno = await alunoService.buscarAlunoPorId(req.params.id)
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' })
    res.json(aluno);
}

async function atualizar(req, res) {
    const aluno = await alunoService.atualizarAluno(req.params.id, req.body)
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' })
    res.json(aluno)
}

async function deletar(req, res) {
    const aluno = await alunoService.deletarAluno(req.params.id);
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
    res.json({ mensagem: 'Aluno deletado com sucesso' });
}

module.exports = {
    criar,
    listar,
    buscarPorId,
    atualizar,
    deletar
};