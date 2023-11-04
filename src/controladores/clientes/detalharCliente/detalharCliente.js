const { StatusCodes } = require("http-status-codes");
const { ErroNaoEncontrado } = require("../../../uteis/erros/erroDaApi");
const {
  detalharClientes,
} = require("../../../provedor/clientesQuerys/queryFuncoes");

const detalharCliente = async (req, res) => {
  const { id } = req.params;

  const cliente = await detalharClientes(id);

  if (!cliente) {
    throw ErroNaoEncontrado("Cliente não encontrado.");
  }

  res.status(StatusCodes.OK).json(cliente);
};

module.exports = { detalharCliente };
