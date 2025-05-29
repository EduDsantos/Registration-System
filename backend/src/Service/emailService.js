const nodemailer = require('nodemailer')
const aluno = require('../Models/alunos')
const pagamento = require('../Controllers/pagamentoController')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'eduss2077@gmail.com',
        pass: '123'
    }
})

async function enviarNotificacao(aluno, pagamento){
    const mailOption = {
        from: 'eduss2077@gmail.com',
        to: aluno.email,
        subject: 'Vencimendo da Mensalidade - Raphael Teixeira academia',
        text: `Olá${Aluno.nome}, sua mensalidade de R$${pagamento.valor} está pendente`
    }
    try{
        await transporter.sendMail(mailOption)
        console.log{`Notificação enviada para ${aluno.email}`}
    }catch(error){
        console.error(`Erro ao enviar notifcação para ${aluno.email}`, error)
    }
}

module.exports = {enviarNotificacao}