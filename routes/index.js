const express = require('express');
const router = express.Router();

const turmaController = require('../controllers/turmaController');
const alunoController = require('../controllers/alunoController');
const grupoController = require('../controllers/grupoController');
const salasController = require('../controllers/salasController');
const reservasController = require('../controllers/reservasController');
const alunoGrupoController = require('../controllers/aluno_grupoController');

// Rotas para Turmas
router.get('/turmas', turmaController.getAllTurmas);
router.get('/turmas/:id', turmaController.getTurmaById);
router.post('/turmas', turmaController.createTurma);
router.put('/turmas/:id', turmaController.updateTurma);
router.delete('/turmas/:id', turmaController.deleteTurma);

// Rotas para Alunos
router.get('/alunos', alunoController.getAllAlunos);
router.get('/alunos/:id', alunoController.getAlunoById);
router.post('/alunos', alunoController.createAluno);
router.put('/alunos/:id', alunoController.updateAluno);
router.delete('/alunos/:id', alunoController.deleteAluno);

// Rotas para Grupos
router.get('/grupos', grupoController.getAllGrupos);
router.get('/grupos/:id', grupoController.getGrupoById);
router.post('/grupos', grupoController.createGrupo);
router.put('/grupos/:id', grupoController.updateGrupo);
router.delete('/grupos/:id', grupoController.deleteGrupo);

// Rotas para Salas
router.get('/salas', salasController.getAllSalas);
router.get('/salas/:id', salasController.getSalaById);
router.post('/salas', salasController.createSala);
router.put('/salas/:id', salasController.updateSala);
router.delete('/salas/:id', salasController.deleteSala);

// Rotas para Reservas
router.get('/reservas', reservasController.getAllReservas);
router.get('/reservas/:id', reservasController.getReservaById);
router.post('/reservas', reservasController.createReserva);
router.put('/reservas/:id', reservasController.updateReserva);
router.delete('/reservas/:id', reservasController.deleteReserva);

// Rotas para Aluno-Grupo
router.get('/aluno-grupos', alunoGrupoController.getAllAlunoGrupos);
router.get('/aluno-grupos/:id', alunoGrupoController.getAlunoGrupoById);
router.post('/aluno-grupos', alunoGrupoController.createAlunoGrupo);
router.put('/aluno-grupos/:id', alunoGrupoController.updateAlunoGrupo);
router.delete('/aluno-grupos/:id', alunoGrupoController.deleteAlunoGrupo);

module.exports = router;