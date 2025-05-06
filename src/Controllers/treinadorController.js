const jwt = require('jsonwebtoken')
const Treinador = require('../Models/treinador')
const treinadorService = require('../Service/treinadorService')

async function login(req, res){
    const {email} = req.body

    try{
        const treinador = await Treinador.findOne({email})
        if(!treinador){
            return res.status(401).json({message: 'Credenciais inválidas'})
        }

        const token = jwt.sign(
            {id: treinador._id, email: treinador.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.json({token})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

async function criar(req, res){
    try{
        const treinador = await treinadorService.criarTreinador(req.body)
        res.status(200).json(treinador)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

async function listarTreinador(req, res){
    const treinador = await treinadorService.listarTreinador()
    res.json(treinador)
}

module.exports = { criar, listarTreinador, login }