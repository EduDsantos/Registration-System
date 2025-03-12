const aluno = require("../Models/alunos")
const mongoose = require('mongoose')
const express = require('express')

const criarAluno = async (req, res) => {
    try {
        const { nome, idade, email, telefone, faixa } = req.body;

        const alunosExistentes = await aluno.findOne({ email })
        if (alunosExistentes) {
            return res.status(400).json({ message: "Aluno com email ja cadastrado" })
        }

        const novoAluno = new aluno({ nome, idade, email, telefone, faixa })
        await novoAluno.save()

        res.status(201).json({ message: "Aluno cadastrado com sucesso!", aluno: novoAluno })
    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar aluno", error: error.message })
    }
}

const listarAlunos = async (req, res) => {
    try {
        const alunos = await aluno.find()
        res.status(200).json(alunos)
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar alunos", error: error.message })
    }

}

// const buscarAlunoPorId = async(req, res) =>{
//     try{
//         const alunoId = await aluno.findById(req.params.id)
//         if(!alunoId){
//             return res.status(404).json({message:"Aluno nao encontrado."})
//         }
//         res.status(200).json(alunoId)
//     }catch(error){
//         res.status(500).json({message:"Erro ao buscar aluno", error: error.message})
//     }
// }

const buscarAlunoPorNome = async (req, res) => {
    try {
        const { nome } = req.params

        const alunoPorNome = await aluno.findOne({ nome: new RegExp(nome, "i") })

        if (!alunoPorNome) {
            return res.status(404).json({ message: "Aluno não encontrado", error: error.message })
        }
        return res.status(200).json(alunoPorNome)
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar aluno", error: error.message })
    }
}



const atualizarAluno = async (req, res) => {
    const{nome}= req.params
    try {
        const alunoAtualizado = await aluno.findByIdAndUpdate({nome}, req.body, { new: true })
        if (!alunoAtualizado) {
            return res.status(404).json({ message: "Aluno não encontrado" })
        }
        res.status(200).json({ message: "Aluno atualizado com sucesso!", aluno: alunoAtualizado })
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar aluno", error: error.message })
    }

}

const excluirAluno = async (req, res) => {
    const {nome}= req.params
    try {
        const alunoExcluido = await aluno.findOneAndDelete({nome})
        if (!alunoExcluido) {
            return res.status(404).json({ message: "Aluno nao encontrado" })
        }
        res.status(200).json({ message: "Aluno excluido com sucesso" })
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir aluno", error: error.message })
    }
}
module.exports = {
    criarAluno,
    listarAlunos,
    //buscarAlunoPorId
    buscarAlunoPorNome,
    atualizarAluno,
    excluirAluno
}