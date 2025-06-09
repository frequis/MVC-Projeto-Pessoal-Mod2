const db = require('../config/db');

const getAll = async () => {
  const result = await db.query(`
    SELECT s.sala_id, s.sala_nome, s.capacidade,
           array_agg(DISTINCT r.grupo_nome) as grupos_reservados
    FROM sala s
    LEFT JOIN reserva r ON s.sala_nome = r.sala_nome
    GROUP BY s.sala_id, s.sala_nome, s.capacidade
    ORDER BY s.sala_nome
  `);
  return result.rows;
};

const getById = async (id) => {
  const result = await db.query(`
    SELECT s.sala_id, s.sala_nome, s.capacidade,
           array_agg(DISTINCT r.grupo_nome) as grupos_reservados
    FROM sala s
    LEFT JOIN reserva r ON s.sala_nome = r.sala_nome
    WHERE s.sala_id = $1
    GROUP BY s.sala_id, s.sala_nome, s.capacidade
  `, [id]);
  return result.rows[0];
};

const create = async (capacidade, sala_nome) => {
  const result = await db.query(
    'INSERT INTO sala (capacidade, sala_nome) VALUES ($1, $2) RETURNING *',
    [capacidade, sala_nome]
  );
  return result.rows[0];
};

const update = async (id, capacidade, sala_nome) => {
  const result = await db.query(
    'UPDATE sala SET capacidade = $1, sala_nome = $2 WHERE sala_id = $3 RETURNING *',
    [capacidade, sala_nome, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query(
    'DELETE FROM sala WHERE sala_id = $1 RETURNING *',
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
