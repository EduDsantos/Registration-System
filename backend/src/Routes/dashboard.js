// const express = require("express");
// const Alunos = require("../Models/alunos");
// const Pagamento = require("../Models/pagamento");
// const router = express.Router();

// // GET /dashboard/summary
// router.get("/dashboard", async (req, res) => {
//   try {
//     const totalStudents = await Alunos.countDocuments();
//     const totalPayments = await Pagamento.countDocuments();
//     const totalPaid = await Pagamento.countDocuments({ status: "paid" });
//     const totalPending = await Pagamento.countDocuments({ status: "pending" });

//     // inadimplentes
//     const overduePayments = await Pagamento.find({ status: "pending" })
//       .populate("student", "name email");

//     // receita por mês (últimos 12 meses)
//     const now = new Date();
//     const pastYear = new Date(now.getFullYear() - 1, now.getMonth() + 1, 1);

//     const revenueByMonth = await Pagamento.aggregate([
//       { $match: { status: "paid", date: { $gte: pastYear } } },
//       {
//         $group: {
//           _id: { year: { $year: "$date" }, month: { $month: "$date" } },
//           total: { $sum: "$amount" }
//         }
//       },
//       { $sort: { "_id.year": 1, "_id.month": 1 } }
//     ]);

//     res.json({
//       totalStudents,
//       totalPayments,
//       totalPaid,
//       totalPending,
//       overduePayments,
//       revenueByMonth
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Erro ao carregar dados do dashboard" });
//   }
// });

// module.exports = router;
