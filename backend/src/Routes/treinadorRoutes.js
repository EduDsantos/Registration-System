const express = require('express')
const router = express.Router()
const treinadorController = require('../Controllers/treinadorController')

router.post('/', treinadorController.criar) 
// router.post('/login', treinadorController.login) 
router.get('/', treinadorController.listarTreinador) 

module.exports = router