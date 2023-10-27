const { clienteCadastrado, emailCliente, cpfCliente } = require("../../../provedor/clientesQuerys/queryFuncoes")

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf } = req.body

    try {
        const emailClienteUnico = await emailCliente(email)
        const cpfClienteUnico = await cpfCliente(cpf)

        if (emailClienteUnico.length >= 1) {
            return res.status(400).json({ error: "email ja existe" })
        }
        if (cpfClienteUnico.length >= 1) {
            return res.status(400).json({ error: "cpf ja existe" })
        }

        await clienteCadastrado(nome, email, cpf)

        res.status(201).json()

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Erro interno do servidor" })
    }


}

module.exports = { cadastrarCliente }