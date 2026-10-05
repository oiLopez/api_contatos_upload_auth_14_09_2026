require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const auth = require('./middleware/authMiddleware');
const usuarioRoutes = require('./routes/usuarioRoutes');
const contatoRoutes = require('./routes/contatoRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
  })
  .catch((erro) => {
    console.error('Erro ao conectar no MongoDB:', erro);
  });

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/contatos', contatoRoutes);
app.use('/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API funcionando!'
  });
});

app.get('/protegida', auth, (req, res) => {
  res.json({
    mensagem: 'Acesso autorizado',
    usuarioId: req.usuarioId
  });
});

module.exports = app;
