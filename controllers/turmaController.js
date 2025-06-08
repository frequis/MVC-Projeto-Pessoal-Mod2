const turmaModel = require('../models/turmaModel');

const getAllTurmas = async (req, res) => {
    try {
        const turmas = await turmaModel.getAll();
        return turmas;
    } catch (err) {
        console.error('Error getting turmas:', err);
        return [];
    }
};


const getTurmaById = async (req, res) => {
  try {
    const turma = await turmaModel.getById(req.params.id);
    if (!turma) return res.status(404).json({ error: 'Turma não encontrada' });
    res.status(200).json(turma);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTurma = async (req, res) => {
  try {
    const { nome, ano_de_entrada } = req.body;
    const novaTurma = await turmaModel.create(nome, ano_de_entrada);
    res.status(201).json(novaTurma);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTurma = async (req, res) => {
  try {
    const { nome, ano_de_entrada } = req.body;
    const turmaAtualizada = await turmaModel.update(req.params.id, nome, ano_de_entrada);
    if (!turmaAtualizada) return res.status(404).json({ error: 'Turma não encontrada' });
    res.status(200).json(turmaAtualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTurma = async (req, res) => {
  try {
    const turmaDeletada = await turmaModel.remove(req.params.id);
    if (!turmaDeletada) return res.status(404).json({ error: 'Turma não encontrada' });
    res.status(200).json(turmaDeletada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTurmas,
  getTurmaById,
  createTurma,
  updateTurma,
  deleteTurma,
};
