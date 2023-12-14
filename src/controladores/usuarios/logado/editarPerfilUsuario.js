const {
  obterUsuarioId,
  obterUsuarioEmail,
  atualizarUsuario,
} = require("../../../provedor/usuarioQuerys/queryFuncoes");
const {
  ErroNaoAutorizado,
  ErroDeConflito,
} = require("../../../uteis/erros/erroDaApi");
const {
  erroNaoAutorizado,
  erroEmailExistente,
} = require("../../../uteis/erros/mensagens");
const criptografarSenha = require("../../../uteis/senhas/criptografiaSenha");
const { StatusCodes } = require("http-status-codes");

const editarPerfilUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  const usuarioExiste = await obterUsuarioId(id);

  if (!usuarioExiste) {
    throw ErroNaoAutorizado(erroNaoAutorizado);
  }

  const emailUsuarioExiste = await obterUsuarioEmail(email);

  if (emailUsuarioExiste) {
    if (id !== emailUsuarioExiste.id) {
      throw ErroDeConflito(erroEmailExistente);
    }
  }

  const senhaCriptografada = await criptografarSenha(senha);

  await atualizarUsuario(id, nome, email, senhaCriptografada);

  res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = editarPerfilUsuario;
