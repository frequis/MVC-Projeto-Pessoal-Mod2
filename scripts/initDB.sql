CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS turma (
  turma_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  turma_nome VARCHAR(100),
  ano_de_entrada INTEGER
);

CREATE TABLE IF NOT EXISTS aluno (
  aluno_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aluno_nome VARCHAR(100),
  turma_id UUID NOT NULL,
  FOREIGN KEY (turma_id) REFERENCES turma(turma_id)
);

CREATE TABLE IF NOT EXISTS grupo (
  grupo_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grupo_nome VARCHAR(100),
  quantidade INTEGER
);

CREATE TABLE IF NOT EXISTS aluno_grupo (
  aluno_grupo_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aluno_id UUID NOT NULL,
  grupo_id UUID NOT NULL,
  FOREIGN KEY (aluno_id) REFERENCES aluno(aluno_id),
  FOREIGN KEY (grupo_id) REFERENCES grupo(grupo_id)
);

CREATE TABLE IF NOT EXISTS sala (
  sala_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  capacidade INTEGER,
  sala_nome VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS reserva (
  reserva_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sala_id UUID NOT NULL,
  aluno_id UUID NOT NULL,
  grupo_id UUID NOT NULL,
  reservado TIMESTAMP,
  começo TIMESTAMP,
  fim TIMESTAMP,
  FOREIGN KEY (sala_id) REFERENCES sala(sala_id),
  FOREIGN KEY (aluno_id) REFERENCES aluno(aluno_id),
  FOREIGN KEY (grupo_id) REFERENCES grupo(grupo_id)
);