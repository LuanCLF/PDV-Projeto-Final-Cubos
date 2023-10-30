const {
  obterUsuarioId,
} = require("../../../provedor/usuarioQuerys/queryFuncoes");
const {
  UnauthorizedRequestError,
} = require("../../../helpers/erros/api-errors-helpers");
const { StatusCodes } = require("http-status-codes");

const detalharPerfilUsuario = async (req, res) => {
  const { id } = req.usuario;

  const perfilUsuario = await obterUsuarioId(id);

  if (!perfilUsuario) {
    throw UnauthorizedRequestError("Usuário não autorizado");
  }

  res.status(StatusCodes.OK).json(req.usuario);
};

module.exports = detalharPerfilUsuario;
