const {
  obterUsuarioId,
  obterUsuarioEmail,
  atualizarUsuario,
  verificarTodosOsEmails,
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

  const idverificado = await verificarTodosOsEmails(emailUsuarioExiste, id);
  console.log(idverificado);

  if (emailUsuarioExiste.length > 0) {
    if (idverificado) {
      throw ConflictRequestError("O email já existe");
    }
  }

  const senhaCriptografada = await criptografarSenha(senha);
  console.log(
    usuarioExiste.email,
    emailUsuarioExiste,
    email,
    req.usuario.email
  );
  await atualizarUsuario(id, nome, email, senhaCriptografada);

  res.status(StatusCodes.NO_CONTENT).json();
};
module.exports = editarPerfilUsuario;
