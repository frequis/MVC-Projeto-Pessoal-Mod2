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

const createSala = async (sala_nome, capacidade) => {
    try {
        if (!sala_nome || !capacidade) {
            throw new Error('Nome da sala e capacidade são obrigatórios');
        }

        const novaSala = await salasModel.create(sala_nome, capacidade);
        return novaSala;
    } catch (error) {
        throw error;
    }
};

const updateSala = async (id, sala_nome, capacidade) => {
    try {
        if (!id || !sala_nome || !capacidade) {
            throw new Error('ID, nome da sala e capacidade são obrigatórios');
        }

        const salaAtualizada = await salasModel.update(id, sala_nome, capacidade);
        
        if (!salaAtualizada) {
            throw new Error('Sala não encontrada');
        }

        return salaAtualizada;
    } catch (error) {
        throw error;
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