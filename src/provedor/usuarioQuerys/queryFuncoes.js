const knex = require("../../bancoDeDados/conexao");

const emailExistente = async (email) => {
  const emailUsuario = await knex("usuarios")
    .select("id")
    .where({ email })
    .first();

  return !!emailUsuario;
};

const obterUsuarioEmail = async (email) => {
  const perfilEncontradoEmail = await knex("usuarios").where({ email }).first();

  return perfilEncontradoEmail;
};

const obterUsuarioId = async (id) => {
  const perfilEncontradoId = await knex("usuarios")
    .where({ id })
    .select(["id", "nome", "email"])
    .first();

  return perfilEncontradoId;
};

const usuarioCadastrado = async (nome, email, senhaCriptografada) => {
  await knex("usuarios").insert({
    nome,
    email,
    senha: senhaCriptografada,
  });

  return;
};

const atualizarUsuario = async (id, nome, email, senhaCriptografada) => {
  const perfilUsuario = await knex("usuarios").where({ id }).update({
    nome,
    email,
    senha: senhaCriptografada,
  });

  return perfilUsuario;
};
const verificarTodosOsEmails = async (array, id) => {
  const perfilCompativel = array.every(
    (elementoAtual) => elementoAtual.id !== id
  );

  return perfilCompativel;
};

module.exports = {
  emailExistente,
  obterUsuarioEmail,
  obterUsuarioId,
  usuarioCadastrado,
  atualizarUsuario,
  verificarTodosOsEmails,
};
