const {
  obterUsuarioId,
} = require("../../../provedor/usuarioQuerys/queryFuncoes");
const {
  UnauthorizedRequestError,
} = require("../../../helpers/erros/api-errors-helpers");
const { contencaoDeErro } = require("../../../helpers/erros/contencaoDeErro");

const detalharPerfilUsuario = contencaoDeErro(async (req, res) => {
  const { id } = req.usuario;

  const perfilUsuario = await obterUsuarioId(id);

  if (!perfilUsuario) {
    throw UnauthorizedRequestError("Usuário não autorizado");
  }

  res.status(200).json(req.usuario);
});

module.exports = detalharPerfilUsuario;
