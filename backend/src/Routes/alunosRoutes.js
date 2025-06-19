const express = require("express")
const router = express.Router()
const alunoController = require('../Controllers/alunoController')
const Aluno = require('../Models/alunos')
const autenticarToken = require('../AuthMiddleware/authMiddleware')

router.get("/ativos", async (req, res) => {
    try {
        const total = await Aluno.countDocuments({ ativo: true });
        res.json({ total });
    } catch (error) {
        console.error("Erro ao buscar alunos ativos:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.get("/pagamentos/pendentes", async (req, res) => {
    try {
        const hoje = new Date()
        const total = await Aluno.countDocuments({
            dataPagamento: { $lt: hoje },
            ativo: true

        });
        res.json({ total })
    } catch (error) {
        console.error("Erro ao buscar pagamentos pendentes:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});



router.get("/crescimento", async (req, res) => {
    try {
        const agora = new Date()
        const primeiroDiaDoMesAtual = new Date(agora.getFullYear(), agora.getMonth(), 1)
        const primeiroDiaDoMesPassado = new Date(agora.getFullYear(), agora.getMonth() - 1, 1)
        const ultimoDiaDoMesPassado = new Date(agora.getFullYear(), agora.getMonth(), 0)

        const totalAtual = await Aluno.countDocuments({ dataCadastro: { $gte: primeiroDiaDoMesAtual } })
        const totalPassado = await Aluno.countDocuments({ dataCadastro: { $gte: primeiroDiaDoMesPassado, $lte: ultimoDiaDoMesPassado } })

        const variacao = totalPassado === 0 ? 100 : ((totalAtual - totalPassado) / totalPassado) * 100

        res.json({ crescimento: variacao.toFixed(1) })
    } catch (error) {
        console.error("Erro ao calcular crescimento:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});


router.post('/cadastrar', autenticarToken, alunoController.criar)
router.get('/', autenticarToken, alunoController.listar)
router.get('/:id', autenticarToken, alunoController.buscarPorId)
router.put('/editar/:id', autenticarToken, alunoController.atualizar)
router.delete('/deletar/:id', autenticarToken, alunoController.deletar)

module.exports = router

