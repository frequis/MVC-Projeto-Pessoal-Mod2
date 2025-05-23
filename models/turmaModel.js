const pool = require('../config/db');

// Buscar todas as turmas
const getAll = async () => {
  const result = await pool.query('SELECT * FROM turma ORDER BY ano_de_entrada DESC');
  return result.rows;
};

// Buscar uma turma pelo ID
const getById = async (id) => {
  const result = await pool.query('SELECT * FROM turma WHERE id = $1', [id]);
  return result.rows[0];
};

// Criar nova turma
const create = async (nome, ano_de_entrada) => {
  const result = await pool.query(
    'INSERT INTO turma (nome, ano_de_entrada) VALUES ($1, $2) RETURNING *',
    [nome, ano_de_entrada]
  );
  return result.rows[0];
};

// Atualizar uma turma existente
const update = async (id, nome, ano_de_entrada) => {
  const result = await pool.query(
    'UPDATE turma SET nome = $1, ano_de_entrada = $2 WHERE id = $3 RETURNING *',
    [nome, ano_de_entrada, id]
  );
  return result.rows[0];
};

// Remover uma turma
const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM turma WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};