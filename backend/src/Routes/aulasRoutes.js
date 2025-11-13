// Routes/aulaRoutes.js
const express = require("express");
const aulasController = require("../Controllers/presencaController");
const router = express.Router();

router.post('/', aulasController.criarAulas);
router.get('/alunos/:tipo', aulasController.listarAlunosPorModalidade);
router.post('/marcar', aulasController.marcarPresenca);

module.exports = router;
                    