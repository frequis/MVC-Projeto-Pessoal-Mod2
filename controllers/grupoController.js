const grupoModel = require('../models/grupoModel');
const alunoGrupoModel = require('../models/aluno_grupoModel');

const getAllGrupos = async (req, res) => {
    try {
        const grupos = await grupoModel.getAll();
        if (!res) return grupos;
        res.status(200).json(grupos);
    } catch (err) {
        console.error('Error getting grupos:', err);
        if (!res) return [];
        res.status(500).json({ error: err.message });
    }
};

const getGrupoById = async (req, res) => {
    try {
        const id = req.params ? req.params.id : req;
        const grupo = await grupoModel.getById(id);
        if (!res) return grupo;
        if (!grupo) {
            res.status(404).json({ message: 'Grupo não encontrado' });
            return;
        }
        res.status(200).json(grupo);
    } catch (err) {
        if (!res) return null;
        res.status(500).json({ error: err.message });
    }
};

const createGrupo = async (grupo_nome, quantidade) => {
    try {
        if (!grupo_nome || !quantidade) {
            throw new Error('Nome do grupo e quantidade são obrigatórios');
        }

        const novoGrupo = await grupoModel.create(grupo_nome, quantidade);
        return novoGrupo;
    } catch (error) {
        throw error;
    }
};

const updateGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const { grupo_nome, quantidade } = req.body;

        if (!id || !grupo_nome || !quantidade) {
            return res.status(400).json({ 
                error: 'ID, nome do grupo e quantidade são obrigatórios' 
            });
        }

        // Get existing grupo to check current name
        const existingGrupo = await grupoModel.getById(id);
        if (!existingGrupo) {
            return res.status(404).json({ error: 'Grupo não encontrado' });
        }

        // Check if there are associated aluno_grupo records
        const hasAssociations = await alunoGrupoModel.findByGrupoNome(existingGrupo.grupo_nome);
        if (hasAssociations && existingGrupo.grupo_nome !== grupo_nome) {
            return res.status(400).json({ 
                error: 'Não é possível alterar o nome do grupo pois existem alunos associados' 
            });
        }

        const grupoAtualizado = await grupoModel.update(id, grupo_nome, quantidade);
        return res.status(200).json(grupoAtualizado);
    } catch (error) {
        console.error('Error updating grupo:', error);
        return res.status(500).json({ error: error.message });
    }
};

const deleteGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Get grupo details first
        const grupo = await grupoModel.getById(id);
        if (!grupo) {
            return res.status(404).json({ error: 'Grupo não encontrado' });
        }

        // Check if there are associated aluno_grupo records
        const hasAssociations = await alunoGrupoModel.findByGrupoNome(grupo.grupo_nome);
        if (hasAssociations) {
            return res.status(400).json({ 
                error: 'Não é possível excluir o grupo pois existem alunos associados' 
            });
        }

        const deletedGrupo = await grupoModel.remove(id);
        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting grupo:', error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllGrupos,
    getGrupoById,
    createGrupo,
    updateGrupo,
    deleteGrupo
};