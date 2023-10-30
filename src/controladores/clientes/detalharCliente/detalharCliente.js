const { StatusCodes } = require("http-status-codes")
const { NotFoundError } = require("../../../helpers/erros/api-errors-helpers")
const {
    detalharClientes,
} = require("../../../provedor/clientesQuerys/queryFuncoes")

const detalharCliente = async (req, res) => {
    const { id } = req.params

    const cliente = await detalharClientes(id)

    if (!cliente) {
        throw NotFoundError("Cliente não encontrado.")
    }

    res.status(StatusCodes.OK).json(cliente)
}

module.exports = { detalharCliente }
