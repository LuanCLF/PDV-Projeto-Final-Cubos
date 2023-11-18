const knex = require("../../bancoDeDados/conexao");

const clienteCadastrado = async (nome, email, cpf) => {
  await knex("clientes").insert({
    nome,
    email,
    cpf,
  });

  return;
};

const checaSeClienteExiste = async (email, cpf) => {
  const usuario = await knex("clientes")
    .select("id")
    .orWhere({ email })
    .orWhere({ cpf })
    .first();

  return !!usuario;
};

const atualizarCliente = async (id, dados) => {
  await knex("clientes").where("id", id).update(dados);
};

const obterCliente = async (id) => {
  const cliente = await knex("clientes").where("id", id).select("id");

  return !cliente[0];
};

const obterClientes = async (pagina, filtro) => {
  const clientes = await knex("clientes")
    .modify((query) => {
      if (filtro && filtro.length) {
        filtro.forEach((item) => {
          query.orWhereLike("nome", `%${item}%`);
        });
      }
    })
    .offset(pagina)
    .limit(10);

  return clientes;
};

const detalharClientes = async (id) => {
  const cliente = await knex("clientes").where({ id }).first();

  return cliente;
};

module.exports = {
  clienteCadastrado,
  obterCliente,
  obterClientes,
  atualizarCliente,
  detalharClientes,
  checaSeClienteExiste,
};
