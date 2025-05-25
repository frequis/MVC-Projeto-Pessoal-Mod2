<img src="../assets/logointeli.png">


# WAD - Web Application Document - Módulo 2 - Inteli



## Projeto Pessoal - Reserva de Salas



## Sumário

1. [Introdução](#c1)  
3. [Modelagem do banco de dados](#c2)  
4. [Desenvolvimento da Aplicação Web](#c3)  
5. [Referências](#c4)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

Será desenvolvido um sistema para gerenciar a reserva e a utilização de salas de forma otimizada e estruturada. A aplicação permite a verificação em tempo real da disponibilidade dos espaços, a realização de reservas e o acompanhamento do uso dos ambientes. Projetado para atender demandas de controle e agendamento em empresas, instituições de ensino, coworkings e demais ambientes com uso compartilhado de salas.

Esse sistema pode ser modificado para diferentes usos, mas nesse projeto o foco será o desenvolvimento de uma plataforma para o Inteli, utilizando as informações da faculdade para gerir o banco de Dados. Para os alunos serão utilizados dados fictícios gerados por IA.

---

## <a name="c2"></a>2. Modelagem do banco de dados

### 2.1. Modelo Relacional  (Semana 3)

# Diagrama do Banco de Dados

Este diagrama mostra o relacionamento entre as entidades: turma, aluno, grupo, salas, reservas e a tabela associativa aluno_grupo.

<div align="center">
  <img src="../assets/Diagrama_final.jpeg" alt="Diagrama do Banco de Dados" width="100%">
  <p><sub>Fonte: Material produzido pelo autor (2025)</sub></p>
</div>

# Modelo de Dados da Aplicação

O esquema abaixo representa o modelo relacional do banco de dados em DBML:

```dbml
Table aluno { 
  id integer [primary key]
  nome varchar
  id_turma varchar [not null, ref: > turma.id]
}

Table aluno_grupo {
  id integer
  id_aluno integer [not null, ref: > aluno.id]
  id_grupo integer [not null, ref: > grupo.id]
}

Table grupo {
  id integer [primary key]
  nome varchar
  quantidade integer
}

Table turma {
  id integer [primary key]
  nome varchar
  ano_de_entrada integer
}

Table salas {
  id integer [primary key]
  capacidade integer
  nome varchar
}

Table reservas {
  id integer [primary key]
  sala_id integer [not null, ref: > salas.id]
  id_aluno integer [not null, ref: > aluno.id]
  id_grupo integer [not null, ref: > grupo.id]
  reservado timestamp
  começo timestamp
  fim timestamp
}
```

### 2.1.1 BD e Models (Semana 5)
O model Turma representa a entidade de turma no sistema, responsável por armazenar informações sobre as turmas cadastradas, como nome e ano de entrada. Ele faz a interface entre a aplicação e o banco de dados para todas as operações relacionadas às turmas.

### 2.2. Arquitetura (Semana 5)

<div align="center">
  <img src="../assets/MVC_diagram.png" alt="Diagrama MVC" width="100%">
  <p><sub>Fonte: Material produzido pelo autor (2025)</sub></p>
</div>

### 2.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 2.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 2.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 2.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c3"></a>3. Desenvolvimento da Aplicação Web (Semana 8)

### 3.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 3.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c4"></a>4. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---