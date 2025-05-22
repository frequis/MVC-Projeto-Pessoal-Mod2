CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE turma (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR,
  ano_de_entrada INTEGER
);

CREATE TABLE aluno (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR,
  id_turma UUID NOT NULL,
  FOREIGN KEY (id_turma) REFERENCES turma(id)
);

CREATE TABLE grupo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR,
  quantidade INTEGER
);

CREATE TABLE aluno_grupo (
  id UUID DEFAULT uuid_generate_v4(),
  id_aluno UUID NOT NULL,
  id_grupo UUID NOT NULL,
  FOREIGN KEY (id_aluno) REFERENCES aluno(id),
  FOREIGN KEY (id_grupo) REFERENCES grupo(id)
);

CREATE TABLE salas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  capacidade INTEGER,
  nome VARCHAR
);

CREATE TABLE reservas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sala_id UUID NOT NULL,
  id_aluno UUID NOT NULL,
  id_grupo UUID NOT NULL,
  reservado TIMESTAMP,
  começo TIMESTAMP,
  fim TIMESTAMP,
  FOREIGN KEY (sala_id) REFERENCES salas(id),
  FOREIGN KEY (id_aluno) REFERENCES aluno(id),
  FOREIGN KEY (id_grupo) REFERENCES grupo(id)
);

