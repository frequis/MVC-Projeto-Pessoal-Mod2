const reservasModel = require('../models/reservasModel');

const getAllReservas = async () => {
    try {
        const reservas = await reservasModel.getAll();
        return reservas;
    } catch (err) {
        console.error('Error getting reservas:', err);
        return [];
    }
};

const getReservaById = async (id) => {
    try {
        const reserva = await reservasModel.getById(id);
        return reserva;
    } catch (err) {
        console.error('Error getting reserva:', err);
        return null;
    }
};

const createReserva = async (req, res) => {
    try {
        const { sala_id, id_aluno, id_grupo, reservado, começo, fim } = req.body;
        const reserva = await reservasModel.create(sala_id, id_aluno, id_grupo, reservado, começo, fim);
        res.status(201).json(reserva);
    } catch (err) {
        res.status(500).json({ error: 'Error creating reserva' });
    }
};

const updateReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { sala_id, id_aluno, id_grupo, reservado, começo, fim } = req.body;
        const reserva = await reservasModel.update(id, sala_id, id_aluno, id_grupo, reservado, começo, fim);
        res.json(reserva);
    } catch (err) {
        res.status(500).json({ error: 'Error updating reserva' });
    }
};

const deleteReserva = async (req, res) => {
    try {
        const { id } = req.params;
        await reservasModel.remove(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Error deleting reserva' });
    }
};

module.exports = {
    getAllReservas,
    getReservaById,
    createReserva,
    updateReserva,
    deleteReserva
};