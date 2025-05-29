const cron = require('node-cron')
const { enviarNotifcacao } = require('./emailService')
const Aluno = require('../Models/alunos')
const Pagamento = require('../Models/pagamento')

cron.schedule('0 8 * * *', async ()=>{
    console.log('Verificando pendencias...')

    try{
        const pagamentosPendentes = await Pagamento.find({ status: 'pendente'})

        for(let pagamento of pagamentosPendentes){
            const hoje = new Date()
            const vencimento = new Date(pagamento.dataVencimento)
        }

    }
})