const db = require('../config/db');

// Helper function to validate reservation times
const validateReservationTime = (começo, fim) => {
    const startDate = new Date(começo);
    const endDate = new Date(fim);
    const now = new Date();
    
    // Validate date format
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Data e hora inválidas');
    }
    
    // Check for past dates
    if (startDate < now) {
        throw new Error('Não é possível fazer reservas em datas passadas');
    }
    
    // Check start vs end time
    if (startDate >= endDate) {
        throw new Error('A hora de início deve ser anterior à hora de fim');
    }
    
    // Check business hours (8h-22h)
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();
    if (startHour < 8 || endHour > 22) {
        throw new Error('Reservas só podem ser feitas entre 8h e 22h');
    }
    
    // Check for weekends
    const dayOfWeek = startDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        throw new Error('Não é possível fazer reservas nos finais de semana');
    }
    
    // Check maximum duration (4 hours)
    const durationHours = (endDate - startDate) / (1000 * 60 * 60);
    if (durationHours > 4) {
        throw new Error('A reserva não pode exceder 4 horas');
    }
};

// Helper function to check sala capacity vs grupo size
const validateCapacity = async (sala_nome, grupo_nome) => {
    const result = await db.query(`
        SELECT s.capacidade, g.quantidade
        FROM sala s, grupo g
        WHERE s.sala_nome = $1 AND g.grupo_nome = $2
    `, [sala_nome, grupo_nome]);
    
    if (result.rows.length === 0) {
        throw new Error('Sala ou grupo não encontrado');
    }
    
    const { capacidade, quantidade } = result.rows[0];
    if (quantidade > capacidade) {
        throw new Error('A capacidade da sala é menor que o tamanho do grupo');
    }
};

// Helper function to check for conflicting reservations
const checkConflictingReservations = async (sala_nome, começo, fim, excludeReservaId = null) => {
    const query = `
        SELECT COUNT(*) 
        FROM reserva 
        WHERE sala_nome = $1 
        AND reserva_id != COALESCE($4, reserva_id)
        AND (
            (começo <= $2 AND fim >= $2)
            OR (começo <= $3 AND fim >= $3)
            OR (começo >= $2 AND fim <= $3)
        )`;
    
    const result = await db.query(query, [sala_nome, começo, fim, excludeReservaId]);
    if (result.rows[0].count > 0) {
        throw new Error('Já existe uma reserva para esta sala neste horário');
    }
};

// Helper function to check maximum reservations per group
const checkMaxReservationsPerGroup = async (grupo_nome, date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const query = `
        SELECT COUNT(*) 
        FROM reserva 
        WHERE grupo_nome = $1 
        AND começo >= $2 
        AND começo < $3
    `;
    
    const result = await db.query(query, [grupo_nome, startOfDay, endOfDay]);
    if (result.rows[0].count >= 2) {
        throw new Error('O grupo já atingiu o limite de 2 reservas por dia');
    }
};

const getAll = async () => {
    const result = await db.query(`
        SELECT r.reserva_id, r.sala_nome, r.aluno_nome, r.grupo_nome,
               r.reservado, r.começo, r.fim,
               s.capacidade as sala_capacidade,
               g.quantidade as grupo_quantidade,
               a.turma_nome
        FROM reserva r
        JOIN sala s ON r.sala_nome = s.sala_nome
        JOIN grupo g ON r.grupo_nome = g.grupo_nome
        JOIN aluno a ON r.aluno_nome = a.aluno_nome
        ORDER BY r.começo DESC
    `);
    return result.rows;
};

const getById = async (id) => {
  const result = await db.query(`
    SELECT r.reserva_id, r.sala_nome, r.aluno_nome, r.grupo_nome,
           r.reservado, r.começo, r.fim,
           s.capacidade as sala_capacidade,
           g.quantidade as grupo_quantidade
    FROM reserva r
    JOIN sala s ON r.sala_nome = s.sala_nome
    JOIN grupo g ON r.grupo_nome = g.grupo_nome
    WHERE r.reserva_id = $1
  `, [id]);
  return result.rows[0];
};

const create = async (sala_nome, aluno_nome, grupo_nome, reservado, começo, fim) => {
    // Validate times
    validateReservationTime(começo, fim);
    
    // Validate capacity
    await validateCapacity(sala_nome, grupo_nome);
    
    // Check maximum reservations
    await checkMaxReservationsPerGroup(grupo_nome, new Date(começo));
    
    // Check conflicts
    await checkConflictingReservations(sala_nome, começo, fim);
    
    // Check if aluno is in grupo
    const alunoInGrupo = await db.query(`
        SELECT * FROM aluno_grupo 
        WHERE aluno_nome = $1 AND grupo_nome = $2
    `, [aluno_nome, grupo_nome]);
    
    if (alunoInGrupo.rows.length === 0) {
        throw new Error('O aluno não pertence a este grupo');
    }
    
    const result = await db.query(`
        INSERT INTO reserva (sala_nome, aluno_nome, grupo_nome, reservado, começo, fim)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `, [sala_nome, aluno_nome, grupo_nome, reservado || new Date(), começo, fim]);
    
    return result.rows[0];
};

const update = async (id, sala_nome, aluno_nome, grupo_nome, reservado, começo, fim) => {
    // Validate reservation time
    validateReservationTime(começo, fim);
    
    // Check for conflicts excluding current reservation
    await checkConflictingReservations(sala_nome, começo, fim, id);
    
    const result = await db.query(`
        UPDATE reserva 
        SET sala_nome = $1, aluno_nome = $2, grupo_nome = $3,
            reservado = $4, começo = $5, fim = $6
        WHERE reserva_id = $7
        RETURNING *
    `, [sala_nome, aluno_nome, grupo_nome, reservado, começo, fim, id]);
    
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
    remove,
    validateReservationTime,
    validateCapacity,
    checkMaxReservationsPerGroup
};