const salasModel = require('../models/salasModel');

const getAllSalas = async () => {
    try {
        const salas = await salasModel.getAll();
        return salas;
    } catch (err) {
        console.error('Error getting salas:', err);
        return [];
    }
};

const getSalaById = async (id) => {
    try {
        const sala = await salasModel.getById(id);
        return sala;
    } catch (err) {
        console.error('Error getting sala:', err);
        return null;
    }
};

const createSala = async (req, res) => {
    try {
        const { capacidade, nome } = req.body;
        const sala = await salasModel.create(capacidade, nome);
        res.status(201).json(sala);
    } catch (err) {
        res.status(500).json({ error: 'Error creating sala' });
    }
};

const updateSala = async (req, res) => {
    try {
        const { id } = req.params;
        const { capacidade, nome } = req.body;
        const sala = await salasModel.update(id, capacidade, nome);
        res.json(sala);
    } catch (err) {
        res.status(500).json({ error: 'Error updating sala' });
    }
};

const deleteSala = async (req, res) => {
    try {
        const { id } = req.params;
        await salasModel.remove(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Error deleting sala' });
    }
};

module.exports = {
    getAllSalas,
    getSalaById,
    createSala,
    updateSala,
    deleteSala
};