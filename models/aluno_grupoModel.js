const db = require('../config/db');

const getAll = async () => {
  const result = await db.query(`
    SELECT ag.*, a.nome as aluno_nome, g.nome as grupo_nome 
    FROM aluno_grupo ag
    JOIN aluno a ON ag.id_aluno = a.id
    JOIN grupo g ON ag.id_grupo = g.id
  `);
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query(`
    SELECT ag.*, a.nome as aluno_nome, g.nome as grupo_nome 
    FROM aluno_grupo ag
    JOIN aluno a ON ag.id_aluno = a.id
    JOIN grupo g ON ag.id_grupo = g.id
    WHERE ag.id = $1
  `, [id]);
  return result.rows[0];
};

const create = async (id_aluno, id_grupo) => {
  const result = await db.query(
    'INSERT INTO aluno_grupo (id_aluno, id_grupo) VALUES ($1, $2) RETURNING *',
    [id_aluno, id_grupo]
  );
  return result.rows[0];
};

const update = async (id, id_aluno, id_grupo) => {
  const result = await db.query(
    'UPDATE aluno_grupo SET id_aluno = $1, id_grupo = $2 WHERE id = $3 RETURNING *',
    [id_aluno, id_grupo, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query(
    'DELETE FROM aluno_grupo WHERE id = $1 RETURNING *',
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