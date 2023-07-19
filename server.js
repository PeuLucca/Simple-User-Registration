const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors()); // permite fazer requisições fora seu domínio

// Middleware para analisar o corpo das requisições em formato JSON
app.use(bodyParser.json());

let users = [];

// Rota para cadastrar um novo usuário
app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const id = users.length + 1;
  const newUser = { id, name, email, password };
  users.push(newUser);
  return res.status(201).json(newUser);
});

// Rota para listar todos os usuários
app.get('/api/users', (req, res) => {
  return res.json(users);
});

// Rota para buscar usuários
app.get('/api/users/search', (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'O parâmetro "name" é obrigatório na busca.' });
  }

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  return res.json(filteredUsers);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
