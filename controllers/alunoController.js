const alunoModel = require('../models/alunoModel');

const getAllAlunos = async (req, res) => {
    try {
        const alunos = await alunoModel.getAll();
        if (!res) return alunos;
        res.status(200).json(alunos);
    } catch (error) {
        console.error('Error getting alunos:', error);
        if (!res) return [];
        res.status(500).json({ error: error.message });
    }
};

const getAlunoById = async (req, res) => {
    try {
        const id = req.params ? req.params.id : req;
        const aluno = await alunoModel.getById(id);
        if (!res) return aluno;
        if (!aluno) {
            res.status(404).json({ message: 'Aluno não encontrado' });
            return;
        }
        res.status(200).json(aluno);
    } catch (error) {
        console.error('Error getting aluno:', error);
        if (!res) return null;
        res.status(500).json({ error: error.message });
    }
};

const createAluno = async (aluno_nome, turma_nome) => {
    try {
        if (!aluno_nome || !turma_nome) {
            throw new Error('Nome do aluno e turma são obrigatórios');
        }

        const novoAluno = await alunoModel.create(aluno_nome, turma_nome);
        return novoAluno;
    } catch (error) {
        throw error;
    }
};

const updateAluno = async (id, aluno_nome, turma_nome) => {
    try {
        if (!id || !aluno_nome || !turma_nome) {
            throw new Error('ID, nome do aluno e turma são obrigatórios');
        }

        const alunoAtualizado = await alunoModel.update(id, aluno_nome, turma_nome);
        
        if (!alunoAtualizado) {
            throw new Error('Aluno não encontrado');
        }

        return alunoAtualizado;
    } catch (error) {
        throw error;
    }
};

const deleteAluno = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAluno = await alunoModel.remove(id);
        
        if (!deletedAluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
        
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting aluno:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllAlunos,
    getAlunoById,
    createAluno,
    updateAluno,
    deleteAluno,
};
