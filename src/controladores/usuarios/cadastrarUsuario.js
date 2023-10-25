
const { emailExistente, usuarioCadastrado } = require("../../bancoDeDados/usuarioQuerys/queryFuncoes");
const criptografarSenha = require("../../utils/criptografiaSenha");

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const EmailCadastrado = await emailExistente(email)

    if (EmailCadastrado.length > 1) {
      return res.status(409).json({ mensagem: "Usuário já está cadastrado" });
    }

    const senhaCriptografada = await criptografarSenha(senha)


    await usuarioCadastrado(nome, email, senhaCriptografada)

    res.status(201).json();
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = { cadastrarUsuario };
