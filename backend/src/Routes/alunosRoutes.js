const express = require("express")
const router = express.Router()
const alunoController = require('../Controllers/alunoController')
const Aluno = require('../Models/alunos')
const autenticarToken = require('../AuthMiddleware/authMiddleware')
const Pagamento = require("../Models/pagamento")



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
        const total = await Pagamento.countDocuments({ status: "pendente" })
        res.json({ total })
    } catch (error) {
        console.error("Erro ao buscar pagamentos pendentes:", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

router.get("/pagamentos/atrasados", async (req, res) => {
    try {
        const hoje = new Date()
        const total = await Pagamento.countDocuments({
            status: "pendente",
            dataVencimento: { $lt: hoje }
        }

        )

        res.json({ total })
    } catch (error) {
        console.error("Erro ao buscar pagamentos pendentes:", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})




router.post('/cadastrar', alunoController.criar)
router.get('/', autenticarToken, alunoController.listar)
router.get('/:id', alunoController.buscarPorId)
router.put('/editar/:id', alunoController.atualizar)
router.delete('/deletar/:id', alunoController.deletar)
router.get('/matriculas/mensal', alunoController.getMatriculasMensal)

module.exports = router

