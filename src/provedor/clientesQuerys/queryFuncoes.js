const knex = require("../../bancoDeDados/conexao")

const clienteCadastrado = async (nome, email, cpf) => {
    await knex("clientes").insert({
        nome,
        email,
        cpf,
    })

    return
}
const emailCliente = async (email) => {
    const emailUnico = await knex("clientes")
        .select("email")
        .where("email", email)

    return !!emailUnico[0]
}

const cpfCliente = async (cpf) => {
    const cpfUnico = await knex("clientes").select("cpf").where("cpf", cpf)

    return !!cpfUnico[0]
}

const atualizarCliente = async (id, dados) => {
    await knex("clientes").where("id", id).update(dados)
}

const obterCliente = async (id) => {
    const cliente = await knex("clientes").where("id", id).select("id")

    return !cliente[0]
}

const obterClientes = async (pagina, filtro) => {
    const clientes = await knex("clientes")
        .offset(pagina)
        .limit(10)
        .orWhereILike("nome", `%${filtro || ""}%`)

    return clientes
}

const detalharClientes = async (id) => {
    const cliente = await knex("clientes").where({ id }).first()

    return cliente
}

module.exports = {
    clienteCadastrado,
    obterCliente,
    obterClientes,
    atualizarCliente,
    emailCliente,
    cpfCliente,
    detalharClientes,
}
