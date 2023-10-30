const { StatusCodes } = require("http-status-codes")
const { NotFoundError } = require("../../../helpers/erros/api-errors-helpers")
const {
    detalharClientes,
} = require("../../../provedor/clientesQuerys/queryFuncoes")

//tenchi quando for mexer, não precisa abrir trycatch, se estourar erro vai cair no middleware

// pra atirar erros você faz assim:

/*  if(talCoisa){
  throw conflictseilaoq("mensagem")
}  

as funções que vc pode jogar estao no arquivo erros no helpers, é o api-erros, se n tiver oq vc precisa, é só criar um, se n conseguir criar chama um de nós

ai pra usar os status code, é só importar a biblioteca StatusCodes e fazer assim

res.status(StatusCodes.OK).json(cliente)
 */

const detalharCliente = async (req, res) => {
    const { id } = req.params

    const cliente = await detalharClientes(id)

    if (!cliente) {
        throw NotFoundError("Cliente não encontrado.")
    }

    res.status(StatusCodes.OK).json(cliente)
}

module.exports = { detalharCliente }
