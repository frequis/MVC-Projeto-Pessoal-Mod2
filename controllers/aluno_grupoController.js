const alunoGrupoModel = require('../models/aluno_grupoModel');

const getAllAlunoGrupos = async () => {
    try {
        const alunoGrupos = await alunoGrupoModel.getAll();
        return alunoGrupos;
    } catch (err) {
        console.error('Error getting aluno-grupos:', err);
        return [];
    }
};

const getAlunoGrupoById = async (id) => {
    try {
        const alunoGrupo = await alunoGrupoModel.getById(id);
        return alunoGrupo;
    } catch (err) {
        console.error('Error getting aluno-grupo:', err);
        return null;
    }
};

const createAlunoGrupo = async (req, res) => {
    try {
        const { id_aluno, id_grupo } = req.body;
        const alunoGrupo = await alunoGrupoModel.create(id_aluno, id_grupo);
        res.status(201).json(alunoGrupo);
    } catch (err) {
        res.status(500).json({ error: 'Error creating aluno-grupo' });
    }
};

const updateAlunoGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_aluno, id_grupo } = req.body;
        const alunoGrupo = await alunoGrupoModel.update(id, id_aluno, id_grupo);
        res.json(alunoGrupo);
    } catch (err) {
        res.status(500).json({ error: 'Error updating aluno-grupo' });
    }
};

const deleteAlunoGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        await alunoGrupoModel.remove(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Error deleting aluno-grupo' });
    }
};

module.exports = {
    getAllAlunoGrupos,
    getAlunoGrupoById,
    createAlunoGrupo,
    updateAlunoGrupo,
    deleteAlunoGrupo
};