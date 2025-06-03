const db = require('../config/db');

const getAll = async () => {
  const result = await db.query('SELECT * FROM salas ORDER BY nome');
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query('SELECT * FROM salas WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (capacidade, nome) => {
  const result = await db.query(
    'INSERT INTO salas (capacidade, nome) VALUES ($1, $2) RETURNING *',
    [capacidade, nome]
  );
  return result.rows[0];
};

const update = async (id, capacidade, nome) => {
  const result = await db.query(
    'UPDATE salas SET capacidade = $1, nome = $2 WHERE id = $3 RETURNING *',
    [capacidade, nome, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query(
    'DELETE FROM salas WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
