CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS turma (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(100),
  ano_de_entrada INTEGER
);

CREATE TABLE IF NOT EXISTS aluno (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(100),
  id_turma UUID NOT NULL,
  FOREIGN KEY (id_turma) REFERENCES turma(id)
);

CREATE TABLE IF NOT EXISTS grupo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(100),
  quantidade INTEGER
);

CREATE TABLE IF NOT EXISTS aluno_grupo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  id_aluno UUID NOT NULL,
  id_grupo UUID NOT NULL,
  FOREIGN KEY (id_aluno) REFERENCES aluno(id),
  FOREIGN KEY (id_grupo) REFERENCES grupo(id)
);

CREATE TABLE IF NOT EXISTS salas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  capacidade INTEGER,
  nome VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS reservas (
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

INSERT INTO turma (nome, ano_de_entrada) VALUES
  ('Turma A', 2022),
  ('Turma B', 2023);

INSERT INTO aluno (nome, id_turma) VALUES
  ('João Silva', (SELECT id FROM turma WHERE nome = 'Turma A' LIMIT 1)),
  ('Maria Oliveira', (SELECT id FROM turma WHERE nome = 'Turma A' LIMIT 1)),
  ('Carlos Souza', (SELECT id FROM turma WHERE nome = 'Turma B' LIMIT 1));

INSERT INTO grupo (nome, quantidade) VALUES
  ('Grupo X', 2),
  ('Grupo Y', 1);

INSERT INTO aluno_grupo (id_aluno, id_grupo) VALUES
  ((SELECT id FROM aluno WHERE nome = 'João Silva' LIMIT 1), (SELECT id FROM grupo WHERE nome = 'Grupo X' LIMIT 1)),
  ((SELECT id FROM aluno WHERE nome = 'Maria Oliveira' LIMIT 1), (SELECT id FROM grupo WHERE nome = 'Grupo X' LIMIT 1)),
  ((SELECT id FROM aluno WHERE nome = 'Carlos Souza' LIMIT 1), (SELECT id FROM grupo WHERE nome = 'Grupo Y' LIMIT 1));

INSERT INTO salas (capacidade, nome) VALUES
  (10, 'Sala 101'),
  (5, 'Sala 202');
