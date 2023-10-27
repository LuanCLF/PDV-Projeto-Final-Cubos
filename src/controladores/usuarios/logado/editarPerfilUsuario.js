const {
  obterUsuarioId,
  obterUsuarioEmail,
  atualizarUsuario,
} = require("../../../bancoDeDados/usuarioQuerys/queryFuncoes");
const {
  UnauthorizedRequestError,
  ConflictRequestError,
} = require("../../../helpers/erros/api-errors-helpers");
const { contencaoDeErro } = require("../../../helpers/erros/contencaoDeErro");
const criptografarSenha = require("../../../helpers/senhas/criptografiaSenha");

const editarPerfilUsuario = contencaoDeErro(async (req, res) => {
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

  res.status(204).json();
});
module.exports = editarPerfilUsuario;
