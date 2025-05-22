const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/api', routes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/api', routes);

// Rota para renderizar a página 1 com turmas
const turmaModel = require('./models/turmaModel');

app.get('/', async (req, res) => {
  try {
    const turmas = await turmaModel.getAll();
    res.render('pages/page1', { turmas });
  } catch (err) {
    res.status(500).send('Erro ao carregar as turmas');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
