const db = require('../config/db');

const getAll = async () => {
  const result = await db.query(`
    SELECT a.aluno_id, a.aluno_nome, a.turma_nome, t.ano_de_entrada 
    FROM aluno a
    JOIN turma t ON a.turma_nome = t.turma_nome
    ORDER BY a.aluno_nome
  `);
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query(`
    SELECT a.aluno_id, a.aluno_nome, a.turma_nome, t.ano_de_entrada 
    FROM aluno a
    JOIN turma t ON a.turma_nome = t.turma_nome
    WHERE a.aluno_id = $1
  `, [id]);
  return result.rows[0];
};

const create = async (aluno_nome, turma_nome) => {
  const result = await db.query(
    'INSERT INTO aluno (aluno_nome, turma_nome) VALUES ($1, $2) RETURNING *',
    [aluno_nome, turma_nome]
  );
  return result.rows[0];
};

const update = async (id, aluno_nome, turma_nome) => {
  const result = await db.query(
    'UPDATE aluno SET aluno_nome = $1, turma_nome = $2 WHERE aluno_id = $3 RETURNING *',
    [aluno_nome, turma_nome, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query(
    'DELETE FROM aluno WHERE aluno_id = $1 RETURNING *',
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
