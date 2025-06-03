const db = require('../config/db');

const getAll = async () => {
  const result = await db.query(`
    SELECT r.*, s.nome as sala_nome, a.nome as aluno_nome, g.nome as grupo_nome
    FROM reservas r
    JOIN salas s ON r.sala_id = s.id
    JOIN aluno a ON r.id_aluno = a.id
    JOIN grupo g ON r.id_grupo = g.id
    ORDER BY r.começo DESC
  `);
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query(`
    SELECT r.*, s.nome as sala_nome, a.nome as aluno_nome, g.nome as grupo_nome
    FROM reservas r
    JOIN salas s ON r.sala_id = s.id
    JOIN aluno a ON r.id_aluno = a.id
    JOIN grupo g ON r.id_grupo = g.id
    WHERE r.id = $1
  `, [id]);
  return result.rows[0];
};

const create = async (sala_id, id_aluno, id_grupo, reservado, começo, fim) => {
  const result = await db.query(
    `INSERT INTO reservas (sala_id, id_aluno, id_grupo, reservado, começo, fim)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [sala_id, id_aluno, id_grupo, reservado, começo, fim]
  );
  return result.rows[0];
};

const update = async (id, sala_id, id_aluno, id_grupo, reservado, começo, fim) => {
  const result = await db.query(
    `UPDATE reservas 
     SET sala_id = $1, id_aluno = $2, id_grupo = $3, reservado = $4, começo = $5, fim = $6
     WHERE id = $7 RETURNING *`,
    [sala_id, id_aluno, id_grupo, reservado, começo, fim, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query(
    'DELETE FROM reservas WHERE id = $1 RETURNING *',
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