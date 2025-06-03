const db = require('../config/db');

const getAll = async () => {
  const result = await db.query('SELECT * FROM grupo ORDER BY nome');
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query('SELECT * FROM grupo WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (nome, quantidade) => {
  const result = await db.query(
    'INSERT INTO grupo (nome, quantidade) VALUES ($1, $2) RETURNING *',
    [nome, quantidade]
  );
  return result.rows[0];
};

const update = async (id, nome, quantidade) => {
  const result = await db.query(
    'UPDATE grupo SET nome = $1, quantidade = $2 WHERE id = $3 RETURNING *',
    [nome, quantidade, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query(
    'DELETE FROM grupo WHERE id = $1 RETURNING *',
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