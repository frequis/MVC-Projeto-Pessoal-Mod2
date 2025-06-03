const grupoModel = require('../models/grupoModel');

const getAllGrupos = async (req, res) => {
  try {
    const grupos = await grupoModel.getAll();
    res.status(200).json(grupos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getGrupoById = async (req, res) => {
  try {
    const grupo = await grupoModel.getById(req.params.id);
    if (!grupo) return res.status(404).json({ error: 'Grupo não encontrado' });
    res.status(200).json(grupo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createGrupo = async (req, res) => {
  try {
    const { nome, quantidade } = req.body;
    const novoGrupo = await grupoModel.create(nome, quantidade);
    res.status(201).json(novoGrupo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateGrupo = async (req, res) => {
  try {
    const { nome, quantidade } = req.body;
    const grupoAtualizado = await grupoModel.update(req.params.id, nome, quantidade);
    if (!grupoAtualizado) return res.status(404).json({ error: 'Grupo não encontrado' });
    res.status(200).json(grupoAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteGrupo = async (req, res) => {
  try {
    const grupoDeletado = await grupoModel.remove(req.params.id);
    if (!grupoDeletado) return res.status(404).json({ error: 'Grupo não encontrado' });
    res.status(200).json(grupoDeletado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllGrupos,
  getGrupoById,
  createGrupo,
  updateGrupo,
  deleteGrupo
};