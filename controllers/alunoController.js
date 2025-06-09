const alunoModel = require('../models/alunoModel');

const getAllAlunos = async () => {
    try {
        const alunos = await alunoModel.getAll();
        return alunos;
    } catch (err) {
        console.error('Error getting alunos:', err);
        return [];
    }
};

const getAlunoById = async (req, res) => {
  try {
    const aluno = await alunoModel.getById(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.status(200).json(aluno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAluno = async (aluno_nome, turma_nome) => {
    try {
        if (!aluno_nome || !turma_nome) {
            throw new Error('Nome do aluno e turma são obrigatórios');
        }

        const novoAluno = await alunoModel.create(aluno_nome, turma_nome);
        return novoAluno;
    } catch (error) {
        throw error;
    }
};

const updateAluno = async (req, res) => {
  try {
    const { nome, id_turma } = req.body;
    const alunoAtualizado = await alunoModel.update(req.params.id, nome, id_turma);
    if (!alunoAtualizado) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.status(200).json(alunoAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAluno = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAluno = await alunoModel.remove(id);
        
        if (!deletedAluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
        
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting aluno:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
  getAllAlunos,
  getAlunoById,
  createAluno,
  updateAluno,
  deleteAluno,
};
