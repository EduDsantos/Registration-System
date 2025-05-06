const Treinador = require('../Models/treinador')

async function criarTreinador(dados) {
    const treinadorExistente = await Treinador.findOne({ email: dados.email })
    if (treinadorExistente) throw new Error("Já existe um treinador com esse e-mail")

    const novoTreinador = new Treinador(dados)
    return await novoTreinador.save()
}

async function listarTreinador() {
    return await Treinador.find()
}

// async function buscarTreinadorPorId(id){
//     return await Treinador.findById(id)
// }

// async function atualizarTreinador(id, dados){
//     return await Treinador.findByIdAndUpdate(id,dados, {new: true})
// }

// async function deletarTreinador(id){
//     return await Treinador.findByIdAndDelete(id)
// }

module.exports = {
    criarTreinador,
    listarTreinador,
    // atualizarTreinador,
    // deletarTreinador,
    // buscarTreinadorPorId
}