// const express = require("express");
// const router = express.Router();
// const Aluno = require("../Models/alunos");

// // 1. Total de alunos
// router.get("/total-alunos", async (req, res) => {
//     const total = await Aluno.countDocuments();
//     res.json({ total });
// });

// // 2. Matrículas dos últimos 12 meses
// router.get("/matriculas/12meses", async (req, res) => {
//     const agora = new Date();
//     const anoPassado = new Date(agora.getFullYear(), agora.getMonth() - 11, 1);

//     const result = await Aluno.aggregate([
//         {
//             $match: {
//                 createdAt: { $gte: anoPassado }
//             }
//         },
//         {
//             $group: {
//                 _id: {
//                     ano: { $year: "$createdAt" },
//                     mes: { $month: "$createdAt" }
//                 },
//                 total: { $sum: 1 }
//             }
//         },
//         { $sort: { "_id.ano": 1, "_id.mes": 1 } }
//     ]);

//     const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

//     const formatado = result.map(r => ({
//         mes: meses[r._id.mes - 1],
//         total: r.total
//     }));

//     res.json(formatado);
// });

// // 3. Crescimento do mês
// router.get("/crescimento", async (req, res) => {
//     const agora = new Date();

//     const inicioMesAtual = new Date(agora.getFullYear(), agora.getMonth(), 1);
//     const inicioMesPassado = new Date(agora.getFullYear(), agora.getMonth() - 1, 1);

//     const totalAtual = await Aluno.countDocuments({ createdAt: { $gte: inicioMesAtual } });

//     const totalPassado = await Aluno.countDocuments({
//         createdAt: { $gte: inicioMesPassado, $lt: inicioMesAtual }
//     });

//     const crescimento = totalPassado === 0
//         ? (totalAtual > 0 ? 100 : 0)
//         : ((totalAtual - totalPassado) / totalPassado) * 100;

//     res.json({ crescimento: crescimento.toFixed(1) });
// });

// module.exports = router;
