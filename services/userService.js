const db = require('../config/db');

// Obter todas as turmas
const getAllTurmas = async () => {
  try {
    const result = await db.query('SELECT * FROM turma');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter turmas: ' + error.message);
  }
};

// Obter uma turma por ID
const getTurmaById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM turma WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter turma: ' + error.message);
  }
};

// Criar uma nova turma
const createTurma = async (nome, anoDeEntrada) => {
  try {
    const result = await db.query(
      'INSERT INTO turma (nome, ano_de_entrada) VALUES ($1, $2) RETURNING *',
      [nome, anoDeEntrada]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar turma: ' + error.message);
  }
};

// Atualizar uma turma existente
const updateTurma = async (id, nome, anoDeEntrada) => {
  try {
    const result = await db.query(
      'UPDATE turma SET nome = $1, ano_de_entrada = $2 WHERE id = $3 RETURNING *',
      [nome, anoDeEntrada, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar turma: ' + error.message);
  }
};

// Deletar uma turma
const deleteTurma = async (id) => {
  try {
    const result = await db.query('DELETE FROM turma WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar turma: ' + error.message);
  }
};

module.exports = {
  getAllTurmas,
  getTurmaById,
  createTurma,
  updateTurma,
  deleteTurma
};
