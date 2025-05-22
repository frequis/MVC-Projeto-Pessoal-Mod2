const alunoModel = require('../models/alunoModel');

const getAllAlunos = async (req, res) => {
  try {
    const alunos = await alunoModel.getAll();
    res.status(200).json(alunos);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

const createAluno = async (req, res) => {
  try {
    const { nome, id_turma } = req.body;
    const novoAluno = await alunoModel.create(nome, id_turma);
    res.status(201).json(novoAluno);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const alunoDeletado = await alunoModel.remove(req.params.id);
    if (!alunoDeletado) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.status(200).json(alunoDeletado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllAlunos,
  getAlunoById,
  createAluno,
  updateAluno,
  deleteAluno,
};
