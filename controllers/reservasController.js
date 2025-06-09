const reservasModel = require('../models/reservasModel');

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

const createReserva = async (sala_nome, aluno_nome, grupo_nome, começo, fim) => {
    try {
        // Validate required fields
        if (!sala_nome || !aluno_nome || !grupo_nome || !começo || !fim) {
            throw new Error('Todos os campos são obrigatórios');
        }

        // Validate dates
        const startDate = new Date(começo);
        const endDate = new Date(fim);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error('Datas inválidas');
        }

        if (startDate >= endDate) {
            throw new Error('A data de início deve ser anterior à data de fim');
        }

        const novaReserva = await reservasModel.create(
            sala_nome,
            aluno_nome,
            grupo_nome,
            começo,
            fim
        );
        return novaReserva;
    } catch (error) {
        throw error;
    }
};

const updateReserva = async (req, res) => {
    try {
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
        res.status(500).json({ error: err.message });
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