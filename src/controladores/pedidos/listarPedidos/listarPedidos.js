const { StatusCodes } = require("http-status-codes");
const {
  buscarPedidos,
} = require("../../../provedor/pedidoQuerys/queryFuncoes");

const listarPedidos = async (req, res) => {
  const cliente_id = req.query.client_id;
  const pedidos = await buscarPedidos(cliente_id);

  return res.status(StatusCodes.OK).json(pedidos);
};

module.exports = { listarPedidos };
