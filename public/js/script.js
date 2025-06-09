// Funções utilitárias
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro na requisição');
    }
    return response.json();
};

const handleError = (error) => {
    console.error('Erro:', error);
    alert(error.message || 'Ocorreu um erro na operação');
};

const handleDelete = async (url, itemName) => {
    try {
        if (!confirm(`Tem certeza que deseja excluir este(a) ${itemName}?`)) {
            return;
        }

        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir ${itemName}`);
        }

        window.location.reload();
    } catch (error) {
        console.error('Erro na exclusão:', error);
        alert(error.message);
    }
};

// API Objects
const api = {
    turma: {
        excluir: async (id) => {
            await handleDelete(`/turmas/${id}`, 'turma');
        }
    },
    aluno: {
        excluir: async (id) => {
            await handleDelete(`/alunos/${id}`, 'aluno');
        }
    },
    grupo: {
        excluir: async (id) => {
            await handleDelete(`/grupos/${id}`, 'grupo');
        }
    },
    sala: {
        excluir: async (id) => {
            await handleDelete(`/salas/${id}`, 'sala');
        }
    },
    reserva: {
        excluir: async (id) => {
            await handleDelete(`/reservas/${id}`, 'reserva');
        }
    },
    alunoGrupo: {
        excluir: async (id) => {
            await handleDelete(`/aluno-grupo/${id}`, 'vínculo aluno-grupo');
        }
    }
};