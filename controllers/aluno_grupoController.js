const alunoGrupoModel = require('../models/aluno_grupoModel');

const getAllAlunoGrupos = async (req, res) => {
    try {
        const alunoGrupos = await alunoGrupoModel.getAll();
        if (!res) return alunoGrupos;
        res.status(200).json(alunoGrupos);
    } catch (err) {
        console.error('Error getting aluno-grupos:', err);
        if (!res) return [];
        res.status(500).json({ error: err.message });
    }
};

const getAlunoGrupoById = async (req, res) => {
    try {
        const id = req.params ? req.params.id : req;
        const alunoGrupo = await alunoGrupoModel.getById(id);
        if (!res) return alunoGrupo;
        if (!alunoGrupo) {
            res.status(404).json({ message: 'Relação aluno-grupo não encontrada' });
            return;
        }
        res.status(200).json(alunoGrupo);
    } catch (err) {
        if (!res) return null;
        res.status(500).json({ error: err.message });
    }
};

const createAlunoGrupo = async (aluno_nome, grupo_nome) => {
    try {
        if (!aluno_nome || !grupo_nome) {
            throw new Error('Nome do aluno e nome do grupo são obrigatórios');
        }

        const result = await alunoGrupoModel.create(aluno_nome, grupo_nome);
        return result;
    } catch (error) {
        throw error;
    }
};

const updateAlunoGrupo = async (req, res) => {
    try {
        const { aluno_nome, grupo_nome } = req.body;
        const alunoGrupo = await alunoGrupoModel.update(req.params.id, aluno_nome, grupo_nome);
        if (!alunoGrupo) {
            res.status(404).json({ message: 'Relação aluno-grupo não encontrada' });
            return;
        }
        res.status(200).json(alunoGrupo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteAlunoGrupo = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAlunoGrupo = await alunoGrupoModel.remove(id);
        
        if (!deletedAlunoGrupo) {
            return res.status(404).json({ error: 'Relação aluno-grupo não encontrada' });
        }
        
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting aluno-grupo:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllAlunoGrupos,
    getAlunoGrupoById,
    createAlunoGrupo,
    updateAlunoGrupo,
    deleteAlunoGrupo
};