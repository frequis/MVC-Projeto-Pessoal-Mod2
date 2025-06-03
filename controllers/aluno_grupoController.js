const alunoGrupoModel = require('../models/aluno_grupoModel');

const getAllAlunoGrupos = async (req, res) => {
  try {
    const alunoGrupos = await alunoGrupoModel.getAll();
    res.status(200).json(alunoGrupos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAlunoGrupoById = async (req, res) => {
  try {
    const alunoGrupo = await alunoGrupoModel.getById(req.params.id);
    if (!alunoGrupo) return res.status(404).json({ error: 'Relação aluno-grupo não encontrada' });
    res.status(200).json(alunoGrupo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAlunoGrupo = async (req, res) => {
  try {
    const { id_aluno, id_grupo } = req.body;
    const novoAlunoGrupo = await alunoGrupoModel.create(id_aluno, id_grupo);
    res.status(201).json(novoAlunoGrupo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAlunoGrupo = async (req, res) => {
  try {
    const { id_aluno, id_grupo } = req.body;
    const alunoGrupoAtualizado = await alunoGrupoModel.update(req.params.id, id_aluno, id_grupo);
    if (!alunoGrupoAtualizado) return res.status(404).json({ error: 'Relação aluno-grupo não encontrada' });
    res.status(200).json(alunoGrupoAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAlunoGrupo = async (req, res) => {
  try {
    const alunoGrupoDeletado = await alunoGrupoModel.remove(req.params.id);
    if (!alunoGrupoDeletado) return res.status(404).json({ error: 'Relação aluno-grupo não encontrada' });
    res.status(200).json(alunoGrupoDeletado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllAlunoGrupos,
  getAlunoGrupoById,
  createAlunoGrupo,
  updateAlunoGrupo,
  deleteAlunoGrupo
};