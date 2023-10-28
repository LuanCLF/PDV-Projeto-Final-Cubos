const knex = require("../../bancoDeDados/conexao");

const clienteCadastrado = async (nome, email, cpf) => {
  await knex("clientes").insert({
    nome,
    email,
    cpf,
  });

  return;
};

const obterClientes = async (pagina, filtro) => {
  const clientes = await knex("clientes")
    .offset(pagina)
    .limit(10)
    .orWhereILike("nome", `%${filtro || ""}%`);

  return clientes;
};

module.exports = { clienteCadastrado, obterClientes };
