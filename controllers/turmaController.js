const turmaModel = require('../models/turmaModel');

const getAllTurmas = async (req, res) => {
    try {
        const turmas = await turmaModel.getAll();
        if (!res) return turmas;
        res.status(200).json(turmas);
    } catch (error) {
        console.error('Error getting turmas:', error);
        if (!res) return [];
        res.status(500).json({ error: error.message });
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
    } catch (error) {
        console.error('Error getting turma:', error);
        if (!res) return null;
        res.status(500).json({ error: error.message });
    }
};

const createTurma = async (req, res) => {
    try {
        const { turma_nome, ano_de_entrada } = req.body;
        
        if (!turma_nome || !ano_de_entrada) {
            return res.status(400).json({
                error: 'Nome da turma e ano de entrada são obrigatórios'
            });
        }

        const novaTurma = await turmaModel.create(turma_nome, ano_de_entrada);
        return res.status(201).json(novaTurma);
    } catch (error) {
        console.error('Error creating turma:', error);
        return res.status(500).json({ error: error.message });
    }
};

const updateTurma = async (req, res) => {
    try {
        const id = req.params.id;
        const { turma_nome, ano_de_entrada } = req.body;
        
        if (!turma_nome || !ano_de_entrada) {
            return res.status(400).json({
                error: 'Nome da turma e ano de entrada são obrigatórios'
            });
        }

        const updatedTurma = await turmaModel.update(id, turma_nome, ano_de_entrada);
        
        if (!updatedTurma) {
            return res.status(404).json({ error: 'Turma não encontrada' });
        }
        
        res.status(200).json(updatedTurma);
    } catch (error) {
        console.error('Error updating turma:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteTurma = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTurma = await turmaModel.remove(id);
        
        if (!deletedTurma) {
            return res.status(404).json({ error: 'Turma não encontrada' });
        }
        
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting turma:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTurmas,
    getTurmaById,
    createTurma,
    updateTurma,
    deleteTurma,
};
