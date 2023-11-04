const {
  obterUsuarioId,
  obterUsuarioEmail,
  atualizarUsuario,
  verificarTodosOsEmails,
} = require("../../../provedor/usuarioQuerys/queryFuncoes");
const {
  ErroNaoAutorizado,
  ErroDeConflito,
} = require("../../../uteis/erros/erroDaApi");
const criptografarSenha = require("../../../uteis/senhas/criptografiaSenha");
const { StatusCodes } = require("http-status-codes");

const editarPerfilUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  const usuarioExiste = await obterUsuarioId(id);

  if (!usuarioExiste) {
    throw ErroNaoAutorizado("Não autorizado");
  }

  const emailUsuarioExiste = await obterUsuarioEmail(email);

  if (emailUsuarioExiste.length > 0) {
    if (id !== emailUsuarioExiste) {
      throw ErroDeConflito("O email já existe");
    }
  }

  const senhaCriptografada = await criptografarSenha(senha);

  await atualizarUsuario(id, nome, email, senhaCriptografada);

  res.status(StatusCodes.NO_CONTENT).json();
};
module.exports = editarPerfilUsuario;
