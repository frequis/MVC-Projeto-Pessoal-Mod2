const db = require('../config/db');

// Buscar todas as turmas
const getAll = async () => {
    const result = await db.query('SELECT * FROM turma ORDER BY turma_nome');
    return result.rows;
};

// Buscar uma turma pelo ID
const getById = async (id) => {
    const result = await db.query(
        'SELECT * FROM turma WHERE turma_id = $1',
        [id]
    );
    return result.rows[0];
};

// Criar nova turma
const create = async (turma_nome, ano_de_entrada) => {
    const result = await db.query(
        'INSERT INTO turma (turma_nome, ano_de_entrada) VALUES ($1, $2) RETURNING *',
        [turma_nome, ano_de_entrada]
    );
    return result.rows[0];
};

// Atualizar uma turma existente
const update = async (id, turma_nome, ano_de_entrada) => {
    const result = await db.query(
        'UPDATE turma SET turma_nome = $1, ano_de_entrada = $2 WHERE turma_id = $3 RETURNING *',
        [turma_nome, ano_de_entrada, id]
    );
    return result.rows[0];
};

// Remover uma turma
const remove = async (id) => {
    const result = await db.query(
        'DELETE FROM turma WHERE turma_id = $1 RETURNING *',
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