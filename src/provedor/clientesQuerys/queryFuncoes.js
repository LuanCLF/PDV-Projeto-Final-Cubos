const knex = require("../../bancoDeDados/conexao");

const clienteCadastrado = async (nome, email, cpf) => {
  await knex("clientes").insert({
    nome,
    email,
    cpf,
  });

  return;
};

const checarSeExiste = async (cpf, email) => {
  const cliente = await knex("clientes")
    .orWhereLike("cpf", cpf || "")
    .orWhereILike("email", email || "")
    .select("id");

  return !!cliente[0];
};

const atualizarCliente = async (id, dados) => {
  await knex("clientes").where("id", id).update(dados);
};

const obterClientes = async (pagina, filtro) => {
  const clientes = await knex("clientes")
    .offset(pagina)
    .limit(10)
    .orWhereILike("nome", `%${filtro || ""}%`);

  return clientes;
};

module.exports = {
  clienteCadastrado,
  checarSeExiste,
  obterClientes,
  atualizarCliente,
};
