const jwt = require("jsonwebtoken");
const { obterUsuarioId } = require("../../provedor/usuarioQuerys/queryFuncoes");
const { senhaJwt } = require("../../uteis/senhas/jwt");
const {
  ErroNaoAutorizado,
  ErroNaoEncontrado,
} = require("../../uteis/erros/erroDaApi");
const {
  erroNaoAutorizado,
  erroUsuarioNaoEncontrado,
} = require("../../uteis/erros/mensagens");

const autenticacao = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw ErroNaoAutorizado(erroNaoAutorizado);
  }

  const token = authorization.replace("Bearer ", "").trim();

  let id;
  try {
    const { id: idUsuario } = jwt.verify(token, senhaJwt);
    id = idUsuario;
  } catch (error) {
    throw ErroNaoAutorizado(erroNaoAutorizado);
  }

  const usuarioExiste = await obterUsuarioId(id);

  if (!usuarioExiste) {
    throw ErroNaoEncontrado(erroUsuarioNaoEncontrado);
  }

  req.usuario = usuarioExiste;

  next();
};

module.exports = autenticacao;
