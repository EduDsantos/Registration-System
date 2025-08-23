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


router.get("/matriculas/mensal", async (req, res) => {
    try {
        const result = await Aluno.aggregate([
            {
                $group: {
                    _id: {
                        ano: { $year: "$createdAt" },
                        mes: { $month: "$createdAt" }
                    },
                    matriculas: { $sum: 1 }
                }
            },
            { $sort: { "_id.ano": 1, "_id.mes": 1 } }
        ]);

        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

        const formatted = result.map(r => ({
            mes: `${meses[r._id.mes - 1]}/${r._id.ano}`,
            matriculas: r.matriculas
        }));

        res.json(formatted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar histórico de matrículas" });
    }
});

router.get("/crescimento", async (req, res) => {
    try {
        const agora = new Date()
        const primeiroDiaDoMesAtual = new Date(agora.getFullYear(), agora.getMonth(), 1)
        const primeiroDiaDoMesPassado = new Date(agora.getFullYear(), agora.getMonth() - 1, 1)
        const ultimoDiaDoMesPassado = new Date(agora.getFullYear(), agora.getMonth(), 0)
      
        const totalAtual = await Aluno.countDocuments({ createdAt: { $gte: primeiroDiaDoMesAtual } })
        const totalPassado = await Aluno.countDocuments({ createdAt: { $gte: primeiroDiaDoMesPassado, $lte: ultimoDiaDoMesPassado } })


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

