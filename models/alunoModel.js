const db = require('../config/db');

const getAll = async () => {
  const result = await db.query('SELECT * FROM aluno');
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query('SELECT * FROM aluno WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (nome, id_turma) => {
  const result = await db.query(
    'INSERT INTO aluno (nome, id_turma) VALUES ($1, $2) RETURNING *',
    [nome, id_turma]
  );
  return result.rows[0];
};

const update = async (id, nome, id_turma) => {
  const result = await db.query(
    'UPDATE aluno SET nome = $1, id_turma = $2 WHERE id = $3 RETURNING *',
    [nome, id_turma, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query('DELETE FROM aluno WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
