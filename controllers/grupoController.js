const grupoModel = require('../models/grupoModel');

const getAllGrupos = async (req, res) => {
    try {
        const grupos = await grupoModel.getAll();
        if (!res) return grupos;
        res.status(200).json(grupos);
    } catch (err) {
        console.error('Error getting grupos:', err);
        if (!res) return [];
        res.status(500).json({ error: err.message });
    }
};

const getGrupoById = async (req, res) => {
    try {
        const id = req.params ? req.params.id : req;
        const grupo = await grupoModel.getById(id);
        if (!res) return grupo;
        if (!grupo) {
            res.status(404).json({ message: 'Grupo não encontrado' });
            return;
        }
        res.status(200).json(grupo);
    } catch (err) {
        if (!res) return null;
        res.status(500).json({ error: err.message });
    }
};

const createGrupo = async (req, res) => {
    try {
        const { grupo_nome, quantidade } = req.body;
        const novoGrupo = await grupoModel.create(grupo_nome, quantidade);
        res.status(201).json(novoGrupo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateGrupo = async (req, res) => {
    try {
        const { grupo_nome, quantidade } = req.body;
        const grupoAtualizado = await grupoModel.update(req.params.id, grupo_nome, quantidade);
        if (!grupoAtualizado) {
            res.status(404).json({ message: 'Grupo não encontrado' });
            return;
        }
        res.status(200).json(grupoAtualizado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteGrupo = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedGrupo = await grupoModel.remove(id);
        
        if (!deletedGrupo) {
            return res.status(404).json({ error: 'Grupo não encontrado' });
        }
        
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting grupo:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllGrupos,
    getGrupoById,
    createGrupo,
    updateGrupo,
    deleteGrupo
};