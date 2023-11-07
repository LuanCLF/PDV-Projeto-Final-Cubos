const { StatusCodes } = require("http-status-codes")
const { NotFoundError } = require("../../../helpers/erros/api-errors-helpers")
const { buscarPedidos } = require("../../../provedor/pedidoQuerys/queryFuncoes")

const listarPedido = async (req, res) => {
    const cliente_id = req.query.client_id
    const pedidos = await buscarPedidos(cliente_id)

    return res.status(StatusCodes.OK).json(pedidos)
}

module.exports = listarPedido
