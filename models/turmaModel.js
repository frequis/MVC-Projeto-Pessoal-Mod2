const db = require('../config/db');

const getAll = async () => {
  const result = await db.query('SELECT * FROM turma');
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query('SELECT * FROM turma WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (nome, ano_de_entrada) => {
  const result = await db.query(
    'INSERT INTO turma (nome, ano_de_entrada) VALUES ($1, $2) RETURNING *',
    [nome, ano_de_entrada]
  );
  return result.rows[0];
};

const update = async (id, nome, ano_de_entrada) => {
  const result = await db.query(
    'UPDATE turma SET nome = $1, ano_de_entrada = $2 WHERE id = $3 RETURNING *',
    [nome, ano_de_entrada, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query('DELETE FROM turma WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
