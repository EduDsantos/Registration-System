const cron = require('node-cron')
const { enviarNotificacao } = require('./emailService')
const Aluno = require('../Models/alunos')
const Pagamento = require('../Models/pagamento')

cron.schedule('0 7 * * *', async () => {
    console.log('Enviando notifcação Às 7h')

    try {
        const pagamentosPendentes = await Pagamento.find({ status: 'pendente' })

        for (let pagamento of pagamentosPendentes) {
            const hoje = new Date()
            const vencimento = new Date(pagamento.dataVencimento)
            const diffDias = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24))

            if (diffDias <= 1 && diffDias >=0) {
                const aluno = await Aluno.findById(pagamento.alunoId)
                if (aluno) {
                    `Enviando notifcação para ${aluno.email}, vencimento em ${diffDias} dias`
                    await enviarNotificacao(aluno, pagamento)
                }else{
                    console.warn(`Aluno com ID ${pagamento.alunoId} não encontrado`)
                }
            }
        }

     

    } catch (error) {
        console.error('Erro no cron de pagamentos: ', error)

    }
})