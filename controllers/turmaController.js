const turmaModel = require('../models/turmaModel');

const getAllTurmas = async (req, res) => {
    try {
        const turmas = await turmaModel.getAll();
        if (!res) return turmas;
        res.status(200).json(turmas);
    } catch (err) {
        console.error('Error getting turmas:', err);
        if (!res) return [];
        res.status(500).json({ error: err.message });
    }
};

const getTurmaById = async (req, res) => {
    try {
        const id = req.params ? req.params.id : req;
        const turma = await turmaModel.getById(id);
        if (!res) return turma;
        if (!turma) {
            res.status(404).json({ message: 'Turma não encontrada' });
            return;
        }
        res.status(200).json(turma);
    } catch (err) {
        console.error('Error getting turma:', err);
        if (!res) return null;
        res.status(500).json({ error: err.message });
    }
};

const createTurma = async (req, res) => {
    try {
        const { nome, ano_de_entrada } = req.body;
        const turma = await turmaModel.create(nome, ano_de_entrada);
        res.status(201).json(turma);
    } catch (err) {
        console.error('Error creating turma:', err);
        res.status(500).json({ error: err.message });
    }
};

const updateTurma = async (req, res) => {
    try {
        const { nome, ano_de_entrada } = req.body;
        const turma = await turmaModel.update(req.params.id, nome, ano_de_entrada);
        if (!turma) {
            res.status(404).json({ message: 'Turma não encontrada' });
            return;
        }
        res.status(200).json(turma);
    } catch (err) {
        console.error('Error updating turma:', err);
        res.status(500).json({ error: err.message });
    }
};

const deleteTurma = async (req, res) => {
    try {
        const result = await turmaModel.remove(req.params.id);
        if (!result) {
            res.status(404).json({ message: 'Turma não encontrada' });
            return;
        }
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting turma:', err);
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
