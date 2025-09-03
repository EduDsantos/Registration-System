const nodemailer = require('nodemailer')
const aluno = require('../Models/alunos')
const { payload } = require('pix-payload')
const QRCode = require('qrcode')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

async function enviarNotificacao(aluno, pagamento) {

    const emv = payload({
        key: 'chavepix@seudominio.com',
        name: 'Academia Raphael Teixeira',
        city: 'AMERICANA',
        amount: Number(pagamento.valor),
        transactionId: 'MENSALIDADE_' + String(pagamento._id).slice(0, 25)
    })

    const qrCodeBase64 = await QRCode.toDataURL(emv)


    const mailOption = {
        from: 'edusantose30@gmail.com',
        to: aluno.email,
        subject: 'Vencimento da Mensalidade - Raphael Teixeira academia',
        text: `Olá ${aluno.name}`,
        html: `
            <p>Sua mensalidade de <strong>R$${pagamento.valor}</strong> está pendente.</p>
            <p>Chave Pix: <strong>chavepix@seudominio.com</strong></p>
            <p>Ou escaneie o QR Code:</p>
            <img src="${qrCodeBase64}" alt="QR Code Pix" />
            <p><small>Pix copia e cola:</small><br><code>${emv}</code></p>
           `
    }
    try {
        await transporter.sendMail(mailOption)
        console.log(`Notificação enviada para ${aluno.email}`)
    } catch (error) {
        console.error(`Erro ao enviar notifcação para ${aluno.email}`, error)
    }
}




module.exports = { enviarNotificacao }