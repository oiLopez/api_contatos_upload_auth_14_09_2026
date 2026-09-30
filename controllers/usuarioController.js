const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

exports.registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaHash = bcrypt.hashSync(senha, 10);

    const usuario = new Usuario({
      nome,
      email,
      senhaHash
    });

    await usuario.save();

    res.status(201).json({
      mensagem: 'Usuário criado'
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        mensagem: 'Email já cadastrado'
      });
    }

    res.status(500).json({
      mensagem: 'Erro ao registrar',
      detalhe: err.message
    });
  }
};
