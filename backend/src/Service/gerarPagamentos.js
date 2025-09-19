const cron = require('node-cron');
const Pagamento = require('../Models/pagamento');
const Aluno = require('../Models/alunos');

cron.schedule('0 0 1 * *', async () => {
  console.log('Gerando pagamentos mensais...');

  try {
    const alunos = await Aluno.find({ status: 'ativo' });
    const hoje = new Date();

    for (let aluno of alunos) {
      const dataVencimento = new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        aluno.diaVencimento || hoje.getDate()
      );

      const novoPagamento = new Pagamento({
        alunoId: aluno._id,
        valor: aluno.plano,
        dataVencimento,
        status: 'pendente'
      });

      await novoPagamento.save();
      console.log(`Pagamento criado para ${aluno.name}`);
    }
  } catch (error) {
    console.error('Erro ao gerar pagamento: ', error);
  }
});
