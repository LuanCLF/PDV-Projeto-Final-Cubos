const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { senhaJwt } = require("../../uteis/senhas/jwt");
const {
  obterUsuarioEmail,
} = require("../../provedor/usuarioQuerys/queryFuncoes");
const { ErroNaoAutorizado } = require("../../uteis/erros/erroDaApi");
const { StatusCodes } = require("http-status-codes");

const loginUsuario = async (req, res) => {
  const { email, senha: senhaEntrada } = req.body;

  const usuario = await obterUsuarioEmail(email);

  if (usuario.length < 1) {
    throw ErroNaoAutorizado("Email ou senha inválidos");
  }

  const { id, senha, nome } = usuario[0];
  const senhaCorreta = await compare(senhaEntrada, senha);

  if (!senhaCorreta) {
    throw ErroNaoAutorizado("Email ou senha inválidos");
  }

  const token = jwt.sign({ id }, senhaJwt, { expiresIn: "8h" });

  res.status(StatusCodes.OK).json({ usuario: { id, nome }, token });
};

module.exports = loginUsuario;
