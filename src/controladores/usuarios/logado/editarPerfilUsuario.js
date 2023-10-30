const {
  obterUsuarioId,
  obterUsuarioEmail,
  atualizarUsuario,
} = require("../../../provedor/usuarioQuerys/queryFuncoes");
const {
  UnauthorizedRequestError,
  ConflictRequestError,
} = require("../../../helpers/erros/api-errors-helpers");
const criptografarSenha = require("../../../helpers/senhas/criptografiaSenha");
const { StatusCodes } = require("http-status-codes");

const editarPerfilUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  const usuarioExiste = await obterUsuarioId(id);

  if (!usuarioExiste) {
    throw UnauthorizedRequestError("Não autorizado");
  }

  const emailUsuarioExiste = await obterUsuarioEmail(email);

  if (emailUsuarioExiste.length > 0) {
    throw ConflictRequestError("O email já existe");
  }

  const senhaCriptografada = await criptografarSenha(senha);

  await atualizarUsuario(id, nome, email, senhaCriptografada);

  res.status(StatusCodes.NO_CONTENT).json();
};
module.exports = editarPerfilUsuario;
