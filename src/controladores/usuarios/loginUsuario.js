const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { senhaJwt } = require("../../uteis/senhas/jwt");
const {
  obterUsuarioEmail,
} = require("../../provedor/usuarioQuerys/queryFuncoes");
const { ErroNaoAutorizado } = require("../../uteis/erros/erroDaApi");
const { StatusCodes } = require("http-status-codes");
const { erroEmailOuSenhaInvalidos } = require("../../uteis/erros/mensagens");

const loginUsuario = async (req, res) => {
  const { email, senha: senhaEntrada } = req.body;

  const usuario = await obterUsuarioEmail(email);

  if (!usuario) {
    throw ErroNaoAutorizado(erroEmailOuSenhaInvalidos);
  }

  const { id, senha, nome } = usuario;
  const senhaCorreta = await compare(senhaEntrada, senha);

  if (!senhaCorreta) {
    throw ErroNaoAutorizado(erroEmailOuSenhaInvalidos);
  }

  const token = jwt.sign({ id }, senhaJwt, { expiresIn: "8h" });

  res.status(StatusCodes.OK).json({ usuario: { id, nome }, token });
};

module.exports = loginUsuario;
