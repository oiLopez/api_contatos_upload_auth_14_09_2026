require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
  })
  .catch((erro) => {
    console.error('Erro ao conectar no MongoDB:', erro);
  });

app.use(express.json());

const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API funcionando!'
  });
});

module.exports = app;
