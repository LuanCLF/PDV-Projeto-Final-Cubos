const { hash } = require("bcrypt");
const knex = require("../../bancoDeDados/conexao");
const { emailExistente, usuarioCadastrado } = require("../../bancoDeDados/queryFuncoes");

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const EmailCadastrado = await emailExistente(email)

    if (EmailCadastrado.length > 0) {
      return res.status(409).json({ mensagem: "Usuário já está cadastrado" });
    }

    const senhaCriptografada = await hash(senha, 10);

    await usuarioCadastrado(nome, email, senhaCriptografada)

    res.status(201).json();
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = { cadastrarUsuario };
