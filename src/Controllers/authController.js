const bcrypt = require('bcryptjs')
const { loginService, generateToken } = require('../Service/authService')


const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const treinador = await loginService(email)

        if (!treinador) {
            return res.status(404).send({ message: "Treinador não encontrado" })
        }

        const senhaIsValid = bcrypt.compareSync(senha, treinador.senha)
        console.log(senhaIsValid)

        if (!senhaIsValid) {
            return res.status(400).send({ message: "Senha errada" })
        }

        const token = generateToken(treinador.id)
        res.send({ token })
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

module.exports = { login }