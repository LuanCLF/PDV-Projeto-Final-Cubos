const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../../../helpers/erros/api-errors-helpers");
const { contencaoDeErro } = require("../../../helpers/erros/contencaoDeErro");
const {
  obterClientes,
} = require("../../../provedor/clientesQuerys/queryFuncoes");

const listarCliente = contencaoDeErro(async (req, res) => {
  let filtro = req.query.filtro;
  let pagina = Number(req.query.pagina);

  pagina = pagina < 0 || isNaN(pagina) ? 0 : pagina * 10;

  const clientes = await obterClientes(pagina, filtro);
  if (clientes.length < 1) {
    throw NotFoundError("Clientes não encontrados");
  }

  res.status(StatusCodes.OK).json(clientes);
});

module.exports = { listarCliente };
