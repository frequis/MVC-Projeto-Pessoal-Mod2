CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS turma (
  turma_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  turma_nome VARCHAR(100) UNIQUE,
  ano_de_entrada INTEGER
);

CREATE TABLE IF NOT EXISTS aluno (
  aluno_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aluno_nome VARCHAR(100) UNIQUE,
  turma_nome VARCHAR(100) NOT NULL,
  FOREIGN KEY (turma_nome) REFERENCES turma(turma_nome)
);

CREATE TABLE IF NOT EXISTS grupo (
  grupo_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grupo_nome VARCHAR(100) UNIQUE,
  quantidade INTEGER
);

CREATE TABLE IF NOT EXISTS aluno_grupo (
  aluno_grupo_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aluno_nome VARCHAR(100) NOT NULL,
  grupo_nome VARCHAR(100) NOT NULL,
  FOREIGN KEY (aluno_nome) REFERENCES aluno(aluno_nome),
  FOREIGN KEY (grupo_nome) REFERENCES grupo(grupo_nome)
);

CREATE TABLE IF NOT EXISTS sala (
  sala_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  capacidade INTEGER,
  sala_nome VARCHAR(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS reserva (
  reserva_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sala_nome VARCHAR(100) NOT NULL,
  aluno_nome VARCHAR(100) NOT NULL,
  grupo_nome VARCHAR(100) NOT NULL,
  reservado TIMESTAMP,
  começo TIMESTAMP,
  fim TIMESTAMP,
  FOREIGN KEY (sala_nome) REFERENCES sala(sala_nome),
  FOREIGN KEY (aluno_nome) REFERENCES aluno(aluno_nome),
  FOREIGN KEY (grupo_nome) REFERENCES grupo(grupo_nome)
);