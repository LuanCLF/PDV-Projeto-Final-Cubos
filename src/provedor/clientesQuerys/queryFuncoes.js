const knex = require("../../bancoDeDados/conexao")

const clienteCadastrado = async (nome, email, cpf) => {
    await knex("clientes").insert({
        nome,
        email,
        cpf,
    });

    return;
};

module.exports = clienteCadastrado