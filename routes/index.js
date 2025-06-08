const express = require('express');
const router = express.Router();

const turmaController = require('../controllers/turmaController');
const alunoController = require('../controllers/alunoController');
const grupoController = require('../controllers/grupoController');
const salasController = require('../controllers/salasController');
const reservasController = require('../controllers/reservasController');
const alunoGrupoController = require('../controllers/aluno_grupoController');

// Rota principal
router.get('/', async (req, res) => {
    try {
        const turmas = await turmaController.getAllTurmas();
        const alunos = await alunoController.getAllAlunos();
        const grupos = await grupoController.getAllGrupos();
        const salas = await salasController.getAllSalas();
        const reservas = await reservasController.getAllReservas();
        const alunoGrupos = await alunoGrupoController.getAllAlunoGrupos();

        res.render('pages/page1', {
            turmas,
            alunos,
            grupos,
            salas,
            reservas,
            alunoGrupos
        });
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        res.status(500).render('error', { error: 'Erro ao carregar dados' });
    }
});

// Rotas para Turmas
router.get('/turmas/novo', (req, res) => {
    try {
        res.render('pages/turma/novo');
    } catch (error) {
        console.error('Erro ao carregar formulário:', error);
        res.status(500).render('error', { error: 'Erro ao carregar formulário' });
    }
});
router.get('/turmas/editar/:id', async (req, res) => {
    try {
        const turma = await turmaController.getTurmaById(req.params.id);
        res.render('pages/turma/editar', { turma });
    } catch (error) {
        console.error('Erro ao carregar turma:', error);
        res.status(500).render('error', { error: 'Erro ao carregar turma' });
    }
});
router.get('/turmas/:id', turmaController.getTurmaById);
router.get('/turmas', turmaController.getAllTurmas);
router.post('/turmas', async (req, res) => {
    try {
        const result = await turmaController.createTurma(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar turma:', error);
        res.status(500).json({ error: error.message });
    }
});
router.put('/turmas/:id', async (req, res) => {
    try {
        const result = await turmaController.updateTurma(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao atualizar turma:', error);
        res.status(500).json({ error: error.message });
    }
});
router.delete('/turmas/:id', async (req, res) => {
    try {
        await turmaController.deleteTurma(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar turma:', error);
        res.status(500).json({ error: error.message });
    }
});

// Rotas para Alunos
router.get('/alunos/novo', async (req, res) => {
    try {
        const turmas = await turmaController.getAllTurmas();
        res.render('pages/aluno/novo', { turmas });
    } catch (error) {
        console.error('Erro ao carregar formulário:', error);
        res.status(500).render('error', { error: 'Erro ao carregar formulário' });
    }
});
router.get('/alunos/editar/:id', async (req, res) => {
    try {
        const aluno = await alunoController.getAlunoById(req.params.id);
        const turmas = await turmaController.getAllTurmas();
        res.render('pages/aluno/editar', { aluno, turmas });
    } catch (error) {
        console.error('Erro ao carregar aluno:', error);
        res.status(500).render('error', { error: 'Erro ao carregar aluno' });
    }
});
router.get('/alunos/:id', alunoController.getAlunoById);
router.get('/alunos', alunoController.getAllAlunos);
router.post('/alunos', async (req, res) => {
    try {
        const result = await alunoController.createAluno(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        res.status(500).json({ error: error.message });
    }
});
router.put('/alunos/:id', async (req, res) => {
    try {
        const result = await alunoController.updateAluno(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ error: error.message });
    }
});
router.delete('/alunos/:id', async (req, res) => {
    try {
        await alunoController.deleteAluno(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar aluno:', error);
        res.status(500).json({ error: error.message });
    }
});

// Rotas para Grupos
router.get('/grupos/novo', (req, res) => {
    try {
        res.render('pages/grupo/novo');
    } catch (error) {
        console.error('Erro ao carregar formulário:', error);
        res.status(500).render('error', { error: 'Erro ao carregar formulário' });
    }
});
router.get('/grupos/editar/:id', async (req, res) => {
    try {
        const grupo = await grupoController.getGrupoById(req.params.id);
        res.render('pages/grupo/editar', { grupo });
    } catch (error) {
        console.error('Erro ao carregar grupo:', error);
        res.status(500).render('error', { error: 'Erro ao carregar grupo' });
    }
});
router.get('/grupos/:id', grupoController.getGrupoById);
router.get('/grupos', grupoController.getAllGrupos);
router.post('/grupos', async (req, res) => {
    try {
        const result = await grupoController.createGrupo(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar grupo:', error);
        res.status(500).json({ error: error.message });
    }
});
router.put('/grupos/:id', grupoController.updateGrupo);
router.delete('/grupos/:id', grupoController.deleteGrupo);

// Rotas para Salas
router.get('/salas/novo', (req, res) => res.render('pages/sala/novo'));
router.get('/salas/editar/:id', async (req, res) => {
    const sala = await salasController.getSalaById(req.params.id);
    res.render('pages/sala/editar', { sala });
});
router.get('/salas/:id', salasController.getSalaById);
router.get('/salas', salasController.getAllSalas);
router.post('/salas', async (req, res) => {
    try {
        const result = await salasController.createSala(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar sala:', error);
        res.status(500).json({ error: error.message });
    }
});
router.put('/salas/:id', salasController.updateSala);
router.delete('/salas/:id', salasController.deleteSala);

// Rotas para Reservas
router.get('/reservas/novo', async (req, res) => {
    try {
        const salas = await salasController.getAllSalas();
        const grupos = await grupoController.getAllGrupos();
        res.render('pages/reserva/novo', { salas, grupos });
    } catch (error) {
        console.error('Erro ao carregar formulário:', error);
        res.status(500).render('error', { error: 'Erro ao carregar formulário' });
    }
});
router.get('/reservas/editar/:id', async (req, res) => {
    const reserva = await reservasController.getReservaById(req.params.id);
    const salas = await salasController.getAllSalas();
    const grupos = await grupoController.getAllGrupos();
    res.render('pages/reserva/editar', { reserva, salas, grupos });
});
router.get('/reservas/:id', reservasController.getReservaById);
router.get('/reservas', reservasController.getAllReservas);
router.post('/reservas', async (req, res) => {
    try {
        const result = await reservasController.createReserva(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar reserva:', error);
        res.status(500).json({ error: error.message });
    }
});
router.put('/reservas/:id', reservasController.updateReserva);
router.delete('/reservas/:id', reservasController.deleteReserva);

// Rotas para Aluno-Grupo
router.get('/aluno-grupo/novo', async (req, res) => {
    const alunos = await alunoController.getAllAlunos();
    const grupos = await grupoController.getAllGrupos();
    res.render('pages/aluno-grupo/novo', { alunos, grupos });
});
router.get('/aluno-grupo/editar/:id', async (req, res) => {
    const alunoGrupo = await alunoGrupoController.getAlunoGrupoById(req.params.id);
    const alunos = await alunoController.getAllAlunos();
    const grupos = await grupoController.getAllGrupos();
    res.render('pages/aluno-grupo/editar', { alunoGrupo, alunos, grupos });
});
router.get('/aluno-grupo/:id', alunoGrupoController.getAlunoGrupoById);
router.get('/aluno-grupo', alunoGrupoController.getAllAlunoGrupos);
router.post('/aluno-grupo', async (req, res) => {
    try {
        const result = await alunoGrupoController.createAlunoGrupo(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar relação aluno-grupo:', error);
        res.status(500).json({ error: error.message });
    }
});
router.put('/aluno-grupo/:id', alunoGrupoController.updateAlunoGrupo);
router.delete('/aluno-grupo/:id', alunoGrupoController.deleteAlunoGrupo);

module.exports = router;