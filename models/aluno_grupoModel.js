const db = require('../config/db');

const getAll = async () => {
  const result = await db.query(`
    SELECT ag.aluno_grupo_id, ag.aluno_nome, ag.grupo_nome,
           a.turma_nome, g.quantidade
    FROM aluno_grupo ag
    JOIN aluno a ON ag.aluno_nome = a.aluno_nome
    JOIN grupo g ON ag.grupo_nome = g.grupo_nome
  `);
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query(`
    SELECT ag.aluno_grupo_id, ag.aluno_nome, ag.grupo_nome,
           a.turma_nome, g.quantidade
    FROM aluno_grupo ag
    JOIN aluno a ON ag.aluno_nome = a.aluno_nome
    JOIN grupo g ON ag.grupo_nome = g.grupo_nome
    WHERE ag.aluno_grupo_id = $1
  `, [id]);
  return result.rows[0];
};

const create = async (aluno_nome, grupo_nome) => {
    const result = await db.query(
        'INSERT INTO aluno_grupo (aluno_nome, grupo_nome) VALUES ($1, $2) RETURNING *',
        [aluno_nome, grupo_nome]
    );
    return result.rows[0];
};

const remove = async (id) => {
    const result = await db.query(
        'DELETE FROM aluno_grupo WHERE aluno_grupo_id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  create,
  remove
};