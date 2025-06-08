const express = require('express');
const router = express.Router();

const turmaController = require('../controllers/turmaController');
const alunoController = require('../controllers/alunoController');
const grupoController = require('../controllers/grupoController');
const salasController = require('../controllers/salasController');
const reservasController = require('../controllers/reservasController');
const alunoGrupoController = require('../controllers/aluno_grupoController');

// Rota principal que renderiza page1.ejs
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
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Rotas para Turmas
router.get('/turmas', turmaController.getAllTurmas);
router.get('/turmas/:id', turmaController.getTurmaById);
router.post('/turmas', turmaController.createTurma);
router.put('/turmas/:id', turmaController.updateTurma);
router.delete('/turmas/:id', turmaController.deleteTurma);
router.get('/turmas/novo', (req, res) => {
    res.render('pages/turma/novo');
});
router.get('/turmas/editar/:id', async (req, res) => {
    try {
        const turma = await turmaController.getTurmaById(req.params.id);
        res.render('pages/turma/editar', { turma });
    } catch (error) {
        res.status(500).send('Error loading turma');
    }
});
router.get('/turmas/excluir/:id', async (req, res) => {
    try {
        await turmaController.deleteTurma(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting turma');
    }
});

// Rotas para Alunos
router.get('/alunos', alunoController.getAllAlunos);
router.get('/alunos/:id', alunoController.getAlunoById);
router.post('/alunos', alunoController.createAluno);
router.put('/alunos/:id', alunoController.updateAluno);
router.delete('/alunos/:id', alunoController.deleteAluno);
router.get('/alunos/novo', (req, res) => {
    res.render('pages/aluno/novo');
});
router.get('/alunos/editar/:id', async (req, res) => {
    try {
        const aluno = await alunoController.getAlunoById(req.params.id);
        res.render('pages/aluno/editar', { aluno });
    } catch (error) {
        res.status(500).send('Error loading aluno');
    }
});
router.get('/alunos/excluir/:id', async (req, res) => {
    try {
        await alunoController.deleteAluno(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting aluno');
    }
});

// Rotas para Grupos
router.get('/grupos', grupoController.getAllGrupos);
router.get('/grupos/:id', grupoController.getGrupoById);
router.post('/grupos', grupoController.createGrupo);
router.put('/grupos/:id', grupoController.updateGrupo);
router.delete('/grupos/:id', grupoController.deleteGrupo);
router.get('/grupos/novo', (req, res) => {
    res.render('pages/grupo/novo');
});
router.get('/grupos/editar/:id', async (req, res) => {
    try {
        const grupo = await grupoController.getGrupoById(req.params.id);
        res.render('pages/grupo/editar', { grupo });
    } catch (error) {
        res.status(500).send('Error loading grupo');
    }
});
router.get('/grupos/excluir/:id', async (req, res) => {
    try {
        await grupoController.deleteGrupo(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting grupo');
    }
});

// Rotas para Salas
router.get('/salas', salasController.getAllSalas);
router.get('/salas/:id', salasController.getSalaById);
router.post('/salas', salasController.createSala);
router.put('/salas/:id', salasController.updateSala);
router.delete('/salas/:id', salasController.deleteSala);
router.get('/salas/novo', (req, res) => {
    res.render('pages/sala/novo');
});
router.get('/salas/editar/:id', async (req, res) => {
    try {
        const sala = await salasController.getSalaById(req.params.id);
        res.render('pages/sala/editar', { sala });
    } catch (error) {
        res.status(500).send('Error loading sala');
    }
});
router.get('/salas/excluir/:id', async (req, res) => {
    try {
        await salasController.deleteSala(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting sala');
    }
});

// Rotas para Reservas
router.get('/reservas', reservasController.getAllReservas);
router.get('/reservas/novo', (req, res) => {
    res.render('pages/reserva/novo');
});

router.get('/reservas/editar/:id', async (req, res) => {
    try {
        const reserva = await reservasController.getReservaById(req.params.id);
        res.render('pages/reserva/editar', { reserva });
    } catch (error) {
        res.status(500).send('Error loading reserva');
    }
});

router.get('/reservas/excluir/:id', async (req, res) => {
    try {
        await reservasController.deleteReserva(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting reserva');
    }
});

// Rotas para Aluno-Grupo
router.get('/aluno-grupos', alunoGrupoController.getAllAlunoGrupos);
router.get('/aluno-grupos/novo', (req, res) => {
    res.render('pages/aluno-grupo/novo');
});

router.get('/aluno-grupos/editar/:id', async (req, res) => {
    try {
        const alunoGrupo = await alunoGrupoController.getAlunoGrupoById(req.params.id);
        res.render('pages/aluno-grupo/editar', { alunoGrupo });
    } catch (error) {
        res.status(500).send('Error loading aluno-grupo');
    }
});

router.get('/aluno-grupos/excluir/:id', async (req, res) => {
    try {
        await alunoGrupoController.deleteAlunoGrupo(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting aluno-grupo');
    }
});

module.exports = router;