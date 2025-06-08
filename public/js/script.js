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

// API Turmas
const turmaApi = {
    async criar(data) {
        try {
            const response = await fetch('/turmas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }
};

// API Alunos
const alunoApi = {
    async criar(data) {
        try {
            const response = await fetch('/alunos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }
};

// API Grupos
const grupoApi = {
    async criar(data) {
        try {
            const response = await fetch('/grupos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }
};

// API Salas
const salaApi = {
    async criar(data) {
        try {
            const response = await fetch('/salas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }
};

// API Reservas
const reservaApi = {
    async criar(data) {
        try {
            const response = await fetch('/reservas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }
};