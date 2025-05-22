const express = require('express');
const router = express.Router();

const turmaController = require('../controllers/turmaController');
const alunoController = require('../controllers/alunoController');

router.get('/turmas', turmaController.getAllTurmas);

module.exports = router;
