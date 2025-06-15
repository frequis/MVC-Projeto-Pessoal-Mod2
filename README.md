# Nome do Projeto
MVC Projeto Pessoal Mod2

# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="/assets/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

## Descrição
Este projeto é uma aplicação desenvolvida utilizando o padrão de arquitetura MVC (Model-View-Controller). Ele foi criado como parte de um estudo pessoal para consolidar conhecimentos em desenvolvimento web e organização de código.

## 📁 Estrutura de pastas

Será utilizado o padrão MVC, que é uma forma de organizar o código de uma aplicação dividindo-a em três camadas principais, cada uma com uma responsabilidade específica. O Model representa os dados e as regras de negócio da aplicação, sendo responsável por acessar e manipular informações no banco de dados. A View é a parte visual, responsável por exibir as informações ao usuário, seja em páginas HTML ou respostas JSON em APIs. Já o Controller atua como um intermediário entre a View e o Model: ele recebe as requisições do usuário, decide o que fazer com elas, interage com o Model quando necessário e retorna a resposta apropriada por meio da View. Essa separação torna o código mais organizado, reutilizável e fácil de manter.

## Funcionalidades
- Cadastro de usuários.
- Autenticação e login.
- Listagem de dados.
- Edição e exclusão de registros.
- Interface amigável e responsiva.

## Passos para executar localmente
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/MVC-Projeto-Pessoal-Mod2.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd MVC-Projeto-Pessoal-Mod2
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
5. Acesse a aplicação no navegador:
   ```
   http://localhost:3000
   ```

## Tecnologias Utilizadas
- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- MongoDB
- Bootstrap
- JavaScript (ES6+)