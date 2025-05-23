const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/index');

// Middleware para ler JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Usar as rotas
app.use('/', routes);

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
