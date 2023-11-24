const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const cors = require('cors'); 

const app = express();
const port = 3001;

// Middleware para analisar o corpo da solicitação como JSON
app.use(express.json());
app.use(cors());

const startMongoMemoryServer = async () => {
    const mongoServer = new MongoMemoryServer();
    await mongoServer.start();

    const mongoUri = mongoServer.getUri();

    mongoose.connect(mongoUri);
};

startMongoMemoryServer();

const alunoSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    disciplinas: [{
        disciplina: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Disciplina'
        },
        nota: Number
    }]
});

const Aluno = mongoose.model('Aluno', alunoSchema);

const disciplinaSchema = new mongoose.Schema({
    nome: String,
    cargaHoraria: Number,
  });

const Disciplina = mongoose.model('Disciplina', disciplinaSchema);

const notasSchema = new mongoose.Schema({
    aluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno',
    },
    disciplina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disciplina',
    },
    nota: Number,
    status: String,
});

const Notas = mongoose.model('Notas', notasSchema);

module.exports = { Aluno, Notas };

// Rota para listar todos os alunos
app.get('/listarAlunos', async (req, res) => {
    try {
        const alunos = await Aluno.find();
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
});

// Rota para cadastrar um novo aluno
app.post('/cadastrarAluno', async (req, res) => {
    const { nome, idade } = req.body;

    try {
        const novoAluno = new Aluno({ nome, idade, disciplinas: [] }); // Adiciona um array vazio para disciplinas
        await novoAluno.save();

        res.status(201).json(novoAluno);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar aluno' });
    }
});

app.post('/cadastrarDisciplina', async (req, res) => {
    const { nome, cargaHoraria } = req.body;

    try {
        const novaDisciplina = new Disciplina({ nome, cargaHoraria });
        await novaDisciplina.save();

        res.status(201).json(novaDisciplina);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar Disciplina' });
    }
});

app.get('/listarDisciplinas', async (req, res) => {
    try {
        const disciplinas = await Disciplina.find();
        res.json(disciplinas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar disciplinas' });
    }
});

app.put('/atualizarAluno/:id', async (req, res) => {
    const alunoId = req.params.id;
    const { nome, idade } = req.body;
  
    try {
      const aluno = await Aluno.findByIdAndUpdate(alunoId, { nome, idade }, { new: true });
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }
  
      res.json(aluno);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
  });  

app.delete('/excluirAluno/:id', async (req, res) => {
    const alunoId = req.params.id;

    try {
        const aluno = await Aluno.findByIdAndDelete(alunoId);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }

        res.json({ message: 'Aluno excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir aluno' });
    }
});

app.post('/lancarNota', async (req, res) => {
    const { alunoId, disciplinaId, nota } = req.body;

    try {
        // Validação básica
        if (!alunoId || !disciplinaId || !nota) {
            return res.status(400).json({ error: 'Por favor, forneça aluno, disciplina e nota.' });
        }

        // Verifica se o aluno e a disciplina existem
        const aluno = await Aluno.findById(alunoId);

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        // Adiciona a disciplina ao array de disciplinas do aluno
        aluno.disciplinas.push({
            disciplina: disciplinaId,
            nota: parseFloat(nota)
        });

        // Salva as alterações no documento do aluno
        await aluno.save();

        // Calcula o status com base na nota
        let status;
        if (nota < 3) {
            status = 'Reprovado';
        } else if (nota >= 3 && nota < 6) {
            status = 'Recuperação';
        } else {
            status = 'Aprovado';
        }

        // Cria e salva a nota no banco de dados com o status
        const novaNota = new Notas({
            aluno: alunoId,
            disciplina: disciplinaId,
            nota: parseFloat(nota),
            status: status,
        });

        await novaNota.save();

        res.status(200).json({ message: 'Nota lançada com sucesso.' });
    } catch (error) {
        console.error('Erro ao lançar nota:', error);
        res.status(500).json({ error: 'Erro interno ao lançar a nota.' });
    }
});

app.get('/listarStatus', async (req, res) => {
    try {
        const notas = await Notas.find().populate('aluno').populate('disciplina');

        const statusList = notas.map(nota => ({
            aluno: nota.aluno.nome,
            disciplina: nota.disciplina.nome,
            nota: nota.nota,
            status: nota.status,
        }));

        res.json(statusList);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar status.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});