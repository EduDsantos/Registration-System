const alunoService = require('../Service/alunoService')
const authService = require('../Service/authService')
const Pagamento = require('../Models/pagamento')


async function criar(req, res) {
    try {
        console.log("recebendo", req.body)
        const aluno = await alunoService.criarAluno(req.body)
        const hoje = new Date()
        const dataVencimento = req.body.dataPagamento
            ? new Date(req.body.dataPagamento)
            : new Date(hoje.getFullYear(), hoje.getMonth() + 1, hoje.getDate())

        const novoPagamento = new Pagamento({
            alunoId: aluno._id,
            valor: aluno.mensalidade,
            dataVencimento: dataVencimento,
            status: 'pendente'

        })

        await novoPagamento.save()

        res.status(200).json({ aluno, Pagamento: novoPagamento })
        const { Authorization } = req.headers
        console.log(Authorization)
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
    try {
        const aluno = await alunoService.deletarAluno(req.params.id);
        if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });

        await Pagamento.deleteMany({ alunoId: req.params.id })

        res.json({ mensagem: 'Aluno deletado com sucesso' });
    } catch (err) {
        console.error(err)
        res.status(400).json({ erro: "Erro ao tentar apagar aluno" })
    }
}

module.exports = {
    criar,
    listar,
    buscarPorId,
    atualizar,
    deletar,
    // getMatriculasMensal
};