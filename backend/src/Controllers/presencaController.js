const Presenca = require('../Models/aula');
const Aluno = require('../Models/alunos');



async function criarAulas(req, res) {
    try {
        console.log("recebendo dados da aula", req.body)
        const { data, horario, tipo } = req.body;
        const criarAula = new Presenca({ data, horario, tipo, alunosPresentes: [] })
        await criarAula.save()
        res.status(200).json({ criarAula })

    } catch (error) {
        res.status(400).json({ erro: error.message })
    }
}

async function listarAulas(req, res) {
    try {
        const aulas = await Presenca.find().sort({ data: -1, horario: -1 });
        res.json(aulas);
    } catch (error) {
        console.error("Erro ao listar aulas", error);
        res.status(500).json({ error: "Erro ao buscar aulas" });
    }
}

async function excluirAulas(req, res) {
    try {
        const { id } = req.params
        const aulas = await Presenca.findByIdAndDelete(id)
        if (!aulas) return res.status(404).json({ erro: "Aula não encontrada" })

        res.status(200).json({ mensagem: "Aula deletada com sucesso!" })

    } catch (error) {
        res.status(500).json({ error: "Erro ao tentar deletar aula!" })
    }
}

async function listarAlunosPorModalidade(req, res) {
    try {
        const { tipo } = req.params;
        const alunos = await Aluno.find({ modalidade: tipo, ativo: true });
        res.status(200).json(alunos);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

async function buscarAula(req, res) {
    try {
        const { id } = req.params;
        const aula = await Presenca.findById(id);

        if (!aula) return res.status(404).json({ error: "Aula não encontrada" });

        res.status(200).json(aula);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar aula" });
    }
}


async function buscarAulaPorId(req, res) {
    try {
        const { id } = req.params;
        const aula = await Presenca.findById(id);

        if (!aula) {
            return res.status(404).json({ erro: "Aula não encontrada" });
        }

        res.status(200).json(aula);
    } catch (error) {
        console.error("Erro ao buscar aula", error);
        res.status(500).json({ erro: "Erro ao buscar aula" });
    }
}

async function marcarPresenca(req, res) {
    try {
        const { _id, alunosPresentes } = req.body;

        const aula = await Presenca.findByIdAndUpdate(
            _id,
            { alunosPresentes },
            { new: true }
        );
        if (!aula) return res.status(404).json({ erro: "Aula não encontrada" });
        res.status(200).json(aula)
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}


module.exports = {
    criarAulas,
    listarAlunosPorModalidade,
    marcarPresenca,
    listarAulas,
    excluirAulas,
    buscarAula,
    buscarAulaPorId
};