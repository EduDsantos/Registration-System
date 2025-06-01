const cron = require('node-cron')
const Pagamento = require('../Models/pagamento')
const Aluno = require('../Models/alunos')

cron.schedule('* * * * *', async () => {

    console.log('Gerando pagamentos mensais...')

    try{
        const alunos = await Aluno.find({status: 'ativo'})

        const hoje = new Date()
        const proximoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, hoje.getDate())

        for(let aluno of alunos){
            const novoPagamento = new Pagamento({
                alunoId: alunos._id,
                valor: alunos.plano,
                dataVencimento: proximoMes,
                status: 'pendente '
            })

            await novoPagamento.save()
            console.log(`Pagamento criado para ${alunos.name}`)

        }
    }catch(error){
        console.error('Erro ao gerar pagamento: ', error)
    }



})