const grupoModel = require('../models/grupoModel');

const getAllGrupos = async () => {
  try {
    const grupos = await grupoModel.getAll();
    return grupos;
  } catch (err) {
    console.error('Error getting grupos:', err);
    return [];
  }
};

const getGrupoById = async (id) => {
  try {
    const grupo = await grupoModel.getById(id);
    return grupo;
  } catch (err) {
    console.error('Error getting grupo:', err);
    return null;
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