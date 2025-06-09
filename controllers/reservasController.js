const reservasModel = require('../models/reservasModel');

// Helper function to validate request body
const validateReservaBody = (body) => {
    const { sala_nome, aluno_nome, grupo_nome, começo, fim } = body;
    
    if (!sala_nome) throw new Error('Nome da sala é obrigatório');
    if (!aluno_nome) throw new Error('Nome do aluno é obrigatório');
    if (!grupo_nome) throw new Error('Nome do grupo é obrigatório');
    if (!começo) throw new Error('Horário de início é obrigatório');
    if (!fim) throw new Error('Horário de fim é obrigatório');
    
    return true;
};

const getAllReservas = async (req, res) => {
    try {
        const reservas = await reservasModel.getAll();
        if (!res) return reservas;
        res.status(200).json(reservas);
    } catch (err) {
        console.error('Error getting reservas:', err);
        if (!res) return [];
        res.status(500).json({ error: err.message });
    }
};

const getReservaById = async (req, res) => {
    try {
        const id = req.params ? req.params.id : req;
        const reserva = await reservasModel.getById(id);
        if (!res) return reserva;
        if (!reserva) {
            res.status(404).json({ message: 'Reserva não encontrada' });
            return;
        }
        res.status(200).json(reserva);
    } catch (err) {
        if (!res) return null;
        res.status(500).json({ error: err.message });
    }
};

const createReserva = async (req, res) => {
    try {
        // Validate request body
        validateReservaBody(req.body);
        
        const { sala_nome, aluno_nome, grupo_nome, reservado, começo, fim } = req.body;
        
        const novaReserva = await reservasModel.create(
            sala_nome, 
            aluno_nome, 
            grupo_nome, 
            reservado || new Date(), 
            começo, 
            fim
        );
        
        res.status(201).json(novaReserva);
    } catch (err) {
        console.error('Error creating reserva:', err);
        res.status(400).json({ 
            error: true,
            message: err.message 
        });
    }
};

const updateReserva = async (req, res) => {
    try {
        // Validate request body
        validateReservaBody(req.body);
        
        const { sala_nome, aluno_nome, grupo_nome, reservado, começo, fim } = req.body;
        
        const reservaAtualizada = await reservasModel.update(
            req.params.id,
            sala_nome,
            aluno_nome,
            grupo_nome,
            reservado,
            começo,
            fim
        );
        
        if (!reservaAtualizada) {
            res.status(404).json({ message: 'Reserva não encontrada' });
            return;
        }
        
        res.status(200).json(reservaAtualizada);
    } catch (err) {
        console.error('Error updating reserva:', err);
        res.status(400).json({ 
            error: true,
            message: err.message 
        });
    }
};

const deleteReserva = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedReserva = await reservasModel.remove(id);
        
        if (!deletedReserva) {
            return res.status(404).json({ error: 'Reserva não encontrada' });
        }
        
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting reserva:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllReservas,
    getReservaById,
    createReserva,
    updateReserva,
    deleteReserva
};