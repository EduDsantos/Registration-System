document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById('formId').addEventListener('submit', async(event) =>{
        event.preventDefault()

        const nome = document.getElementById('nome')
        const idade = document.getElementById('idade')
        const email = document.getElementById('email')
        const telefone = document.getElementById('telefone')
        const cpf = document.getElementById('cpf')
        const restricao = document.getElementById('restmedico')
        const dataCadastro = document.getElementById('dataCadastro')
        const pagamento = document.getElementById('statusPagamento')

        const alunos = {nome, idade, email, telefone, cpf, restricao, dataCadastro, pagamento}

        // try{
        //     const resposta = await fetch("/criarAluno", {method:"POST" } )
        // }
    })

    
})