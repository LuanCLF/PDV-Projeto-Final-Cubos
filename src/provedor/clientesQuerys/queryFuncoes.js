const knex = require("../../bancoDeDados/conexao")

const clienteCadastrado = async (nome, email, cpf) => {
    await knex("clientes").insert({
        nome,
        email,
        cpf,
    });

    return;
};
const emailCliente = async (email) => {
    const emailUnico = await knex("clientes").select("email").where("email", email)
    return emailUnico;
}

const cpfCliente = async (cpf) => {
    const cpfUnico = await knex("clientes").select("cpf").where("cpf", cpf)

    return cpfUnico;
}
module.exports = {
    clienteCadastrado,
    emailCliente,
    cpfCliente
}