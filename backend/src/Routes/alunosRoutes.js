const express = require("express")
const router = express.Router()
const alunoController = require('../Controllers/alunoController')
const autenticarToken = require('../AuthMiddleware/authMiddleware')

router.post('/cadastrar', autenticarToken, alunoController.criar)
router.get('/', autenticarToken, alunoController.listar)
router.get('/:id', autenticarToken, alunoController.buscarPorId)
router.put('/editar/:id', autenticarToken, alunoController.atualizar)
router.delete('/deletar/:id', autenticarToken, alunoController.deletar)

module.exports = router

