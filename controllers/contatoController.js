const Contato = require('../models/Contato');

exports.criar = async (req, res) => {
  const { nome, email, telefone, endereco, fotoId } = req.body;

  try {
    const contato = new Contato({
      nome,
      email,
      telefone,
      endereco,
      fotoId,
      usuarioId: req.usuarioId
    });

    await contato.save();

    res.status(201).json({
      mensagem: 'Contato criado',
      contato
    });

  } catch (err) {
    res.status(500).json({
      mensagem: 'Erro ao criar contato',
      detalhe: err.message
    });
  }
};

exports.listar = async (req, res) => {
  try {
    const contatos = await Contato.find({
      usuarioId: req.usuarioId
    });

    res.json(contatos);

  } catch (err) {
    res.status(500).json({
      mensagem: 'Erro ao listar contatos',
      detalhe: err.message
    });
  }
};
