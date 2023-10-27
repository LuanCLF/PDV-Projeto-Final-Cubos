const { StatusCodes } = require("http-status-codes");
const {
  ConflictRequestError,
} = require("../../helpers/erros/api-errors-helpers");
const {
  emailExistente,
  usuarioCadastrado,
} = require("../../provedor/usuarioQuerys/queryFuncoes");
const criptografarSenha = require("../../helpers/senhas/criptografiaSenha");
const { contencaoDeErro } = require("../../helpers/erros/contencaoDeErro");

const cadastrarUsuario = contencaoDeErro(async (req, res) => {
  const { nome, email, senha } = req.body;

  const EmailCadastrado = await emailExistente(email);

  if (EmailCadastrado.length > 0) {
    throw ConflictRequestError("O Email já está cadastrado!");
  }

  const senhaCriptografada = await criptografarSenha(senha);

  await usuarioCadastrado(nome, email, senhaCriptografada);

  res.status(StatusCodes.CREATED).json();
});

module.exports = cadastrarUsuario;
