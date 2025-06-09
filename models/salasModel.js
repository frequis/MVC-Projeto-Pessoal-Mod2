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

const create = async (sala_nome, capacidade) => {
    const result = await db.query(
        'INSERT INTO sala (sala_nome, capacidade) VALUES ($1, $2) RETURNING *',
        [sala_nome, capacidade]
    );
    return result.rows[0];
};

const update = async (id, sala_nome, capacidade) => {
    const result = await db.query(
        'UPDATE sala SET sala_nome = $2, capacidade = $3 WHERE sala_id = $1 RETURNING *',
        [id, sala_nome, capacidade]
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
