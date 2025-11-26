// Routes/aulaRoutes.js
const express = require("express");
const aulasController = require("../Controllers/presencaController");
const router = express.Router();

router.post('/', aulasController.criarAulas);
router.get('/', aulasController.listarAulas);
router.post('/presencas', aulasController.marcarPresenca);

router.get('/alunos/:tipo', aulasController.listarAlunosPorModalidade);


router.get('/:id', aulasController.buscarAulaPorId);
router.delete('/:id', aulasController.excluirAulas);


module.exports = router;
