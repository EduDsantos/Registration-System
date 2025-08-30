const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

async function enviarNotificacao(aluno, pagamento) {
    const mailOption = {
        from: process.env.EMAIL_USER,
        to: aluno.email,
        subject: 'Vencimendo da Mensalidade - Raphael Teixeira academia',
        text: `Olá ${aluno.name}, sua mensalidade de R$${pagamento.valor} está pendente, por favor entre em contato para efetuar o seu pagamento!`
    }
    try {
        await transporter.sendMail(mailOption)
        console.log(`Notificação enviada para ${aluno.email}`)
    } catch (error) {
        console.error(`Erro ao enviar notifcação para ${aluno.email}`, error)
    }
}




module.exports = { enviarNotificacao }