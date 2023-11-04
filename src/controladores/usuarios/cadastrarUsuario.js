const { StatusCodes } = require("http-status-codes");
const { ErroDeConflito } = require("../../uteis/erros/erroDaApi");
const {
  emailExistente,
  usuarioCadastrado,
} = require("../../provedor/usuarioQuerys/queryFuncoes");
const criptografarSenha = require("../../uteis/senhas/criptografiaSenha");
const { mensagemDeErro } = require("../../uteis/erros/mensagens");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  const emailExiste = await emailExistente(email);

  if (emailExiste) {
    throw ErroDeConflito(mensagemDeErro.emailExistente);
  }

  const senhaCriptografada = await criptografarSenha(senha);

  await usuarioCadastrado(nome, email, senhaCriptografada);

  res.status(StatusCodes.CREATED).json();
};

module.exports = cadastrarUsuario;
