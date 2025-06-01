const express = require("express")
const router = express.Router()
const alunoController = require('../Controllers/alunoController')
const autenticarToken = require('../AuthMiddleware/authMiddleware')

router.post('/', autenticarToken, alunoController.criar)
router.get('/', autenticarToken, alunoController.listar)
router.get('/:id', autenticarToken, alunoController.buscarPorId)
router.put('/:id', autenticarToken, alunoController.atualizar)
router.delete('/:id', autenticarToken, alunoController.deletar)

module.exports = router

