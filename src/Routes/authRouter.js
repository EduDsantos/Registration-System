const {Router} = require('express')
const routerAuth = Router()

const {login} = require('../Controllers/authController')

routerAuth.post('/', login)

module.exports = routerAuth