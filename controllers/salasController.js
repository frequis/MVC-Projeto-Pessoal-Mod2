const salasModel = require('../models/salasModel');

const getAllSalas = async (req, res) => {
    try {
        const salas = await salasModel.getAll();
        if (!res) return salas;
        res.status(200).json(salas);
    } catch (err) {
        console.error('Error getting salas:', err);
        if (!res) return [];
        res.status(500).json({ error: err.message });
    }
};

const getSalaById = async (req, res) => {
    try {
        const id = req.params ? req.params.id : req;
        const sala = await salasModel.getById(id);
        if (!res) return sala;
        if (!sala) {
            res.status(404).json({ message: 'Sala não encontrada' });
            return;
        }
        res.status(200).json(sala);
    } catch (err) {
        if (!res) return null;
        res.status(500).json({ error: err.message });
    }
};

const createSala = async (req, res) => {
    try {
        const { capacidade, sala_nome } = req.body;
        const novaSala = await salasModel.create(capacidade, sala_nome);
        res.status(201).json(novaSala);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateSala = async (req, res) => {
    try {
        const { capacidade, sala_nome } = req.body;
        const salaAtualizada = await salasModel.update(req.params.id, capacidade, sala_nome);
        if (!salaAtualizada) {
            res.status(404).json({ message: 'Sala não encontrada' });
            return;
        }
        res.status(200).json(salaAtualizada);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteSala = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedSala = await salasModel.remove(id);
        
        if (!deletedSala) {
            return res.status(404).json({ error: 'Sala não encontrada' });
        }
        
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting sala:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllSalas,
    getSalaById,
    createSala,
    updateSala,
    deleteSala
};