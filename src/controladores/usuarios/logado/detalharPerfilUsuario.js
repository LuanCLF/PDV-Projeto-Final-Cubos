const {
  obterUsuarioId,
} = require("../../../provedor/usuarioQuerys/queryFuncoes");
const { ErroNaoAutorizado } = require("../../../uteis/erros/erroDaApi");
const { StatusCodes } = require("http-status-codes");
const { erroNaoAutorizado } = require("../../../uteis/erros/mensagens");

const detalharPerfilUsuario = async (req, res) => {
  const { id } = req.usuario;

  const perfilUsuario = await obterUsuarioId(id);

  if (!perfilUsuario) {
    throw ErroNaoAutorizado(erroNaoAutorizado);
  }

  res.status(StatusCodes.OK).json({ usuario: req.usuario });
};

module.exports = detalharPerfilUsuario;
