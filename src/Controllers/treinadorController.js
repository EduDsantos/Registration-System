const jwt = require('jsonwebtoken')
const Treinador = require('../Models/treinador')
const treinadorService = require('../Service/treinadorService')
const bcrypt = require('bcryptjs')

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

module.exports = { criar, listarTreinador }