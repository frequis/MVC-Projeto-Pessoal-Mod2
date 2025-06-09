const db = require('../config/db');

const getAll = async () => {
  const result = await db.query(`
    SELECT g.grupo_id, g.grupo_nome, g.quantidade,
           array_agg(ag.aluno_nome) as alunos
    FROM grupo g
    LEFT JOIN aluno_grupo ag ON g.grupo_nome = ag.grupo_nome
    GROUP BY g.grupo_id, g.grupo_nome, g.quantidade
    ORDER BY g.grupo_nome
  `);
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query(`
    SELECT g.grupo_id, g.grupo_nome, g.quantidade,
           array_agg(ag.aluno_nome) as alunos
    FROM grupo g
    LEFT JOIN aluno_grupo ag ON g.grupo_nome = ag.grupo_nome
    WHERE g.grupo_id = $1
    GROUP BY g.grupo_id, g.grupo_nome, g.quantidade
  `, [id]);
  return result.rows[0];
};

const create = async (grupo_nome, quantidade) => {
    const result = await db.query(
        'INSERT INTO grupo (grupo_nome, quantidade) VALUES ($1, $2) RETURNING *',
        [grupo_nome, quantidade]
    );
    return result.rows[0];
};

const update = async (id, grupo_nome, quantidade) => {
  const result = await db.query(
    'UPDATE grupo SET grupo_nome = $1, quantidade = $2 WHERE grupo_id = $3 RETURNING *',
    [grupo_nome, quantidade, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query(
    'DELETE FROM grupo WHERE grupo_id = $1 RETURNING *',
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