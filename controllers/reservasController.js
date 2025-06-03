const reservasModel = require('../models/reservasModel');

const getAllReservas = async (req, res) => {
  try {
    const reservas = await reservasModel.getAll();
    res.status(200).json(reservas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getReservaById = async (req, res) => {
  try {
    const reserva = await reservasModel.getById(req.params.id);
    if (!reserva) return res.status(404).json({ error: 'Reserva não encontrada' });
    res.status(200).json(reserva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createReserva = async (req, res) => {
  try {
    const { sala_id, id_aluno, id_grupo, reservado, começo, fim } = req.body;
    const novaReserva = await reservasModel.create(sala_id, id_aluno, id_grupo, reservado, começo, fim);
    res.status(201).json(novaReserva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateReserva = async (req, res) => {
  try {
    const { sala_id, id_aluno, id_grupo, reservado, começo, fim } = req.body;
    const reservaAtualizada = await reservasModel.update(
      req.params.id,
      sala_id,
      id_aluno,
      id_grupo,
      reservado,
      começo,
      fim
    );
    if (!reservaAtualizada) return res.status(404).json({ error: 'Reserva não encontrada' });
    res.status(200).json(reservaAtualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteReserva = async (req, res) => {
  try {
    const reservaDeletada = await reservasModel.remove(req.params.id);
    if (!reservaDeletada) return res.status(404).json({ error: 'Reserva não encontrada' });
    res.status(200).json(reservaDeletada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva
};