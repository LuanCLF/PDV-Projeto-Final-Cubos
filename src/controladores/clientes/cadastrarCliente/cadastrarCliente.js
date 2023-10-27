const clienteCadastrado = require("../../../provedor/clientesQuerys/queryFuncoes")

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf } = req.body
    const { } = req.usuario

    await clienteCadastrado(nome, email, cpf)


}

module.exports = { cadastrarCliente }