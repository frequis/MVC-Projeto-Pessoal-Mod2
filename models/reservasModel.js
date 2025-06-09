const db = require('../config/db');

const getAll = async () => {
    const result = await db.query('SELECT * FROM reserva ORDER BY começo');
    return result.rows;
};

const getById = async (id) => {
    const result = await db.query('SELECT * FROM reserva WHERE reserva_id = $1', [id]);
    return result.rows[0];
};

const create = async (sala_nome, aluno_nome, grupo_nome, começo, fim) => {
    try {
        // Convert dates to ISO format
        const startDate = new Date(começo).toISOString();
        const endDate = new Date(fim).toISOString();
        const reservedDate = new Date().toISOString(); // Current timestamp for reservado

        const result = await db.query(
            'INSERT INTO reserva (sala_nome, aluno_nome, grupo_nome, reservado, começo, fim) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [sala_nome, aluno_nome, grupo_nome, reservedDate, startDate, endDate]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error in create reserva:', error);
        throw error;
    }
};

const update = async (id, sala_nome, aluno_nome, grupo_nome, reservado, começo, fim) => {
    const result = await db.query(
        'UPDATE reserva SET sala_nome = $2, aluno_nome = $3, grupo_nome = $4, reservado = $5, começo = $6, fim = $7 WHERE reserva_id = $1 RETURNING *',
        [id, sala_nome, aluno_nome, grupo_nome, reservado, começo, fim]
    );
    return result.rows[0];
};

const remove = async (id) => {
    const result = await db.query(
        'DELETE FROM reserva WHERE reserva_id = $1 RETURNING *',
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