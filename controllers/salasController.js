const salasModel = require('../models/salasModel');

const getAllSalas = async (req, res) => {
  try {
    const salas = await salasModel.getAll();
    res.status(200).json(salas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSalaById = async (req, res) => {
  try {
    const sala = await salasModel.getById(req.params.id);
    if (!sala) return res.status(404).json({ error: 'Sala não encontrada' });
    res.status(200).json(sala);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createSala = async (req, res) => {
  try {
    const { capacidade, nome } = req.body;
    const novaSala = await salasModel.create(capacidade, nome);
    res.status(201).json(novaSala);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSala = async (req, res) => {
  try {
    const { capacidade, nome } = req.body;
    const salaAtualizada = await salasModel.update(req.params.id, capacidade, nome);
    if (!salaAtualizada) return res.status(404).json({ error: 'Sala não encontrada' });
    res.status(200).json(salaAtualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSala = async (req, res) => {
  try {
    const salaDeletada = await salasModel.remove(req.params.id);
    if (!salaDeletada) return res.status(404).json({ error: 'Sala não encontrada' });
    res.status(200).json(salaDeletada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllSalas,
  getSalaById,
  createSala,
  updateSala,
  deleteSala
};