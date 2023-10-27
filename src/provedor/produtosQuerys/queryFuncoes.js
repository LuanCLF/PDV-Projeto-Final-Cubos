const knex = require("../../bancoDeDados/conexao");

const verificarCategoria = async (categoria_id) => {
  const categoriaExistente = await __knex__("categorias").where(
    "id",
    categoria_id
  );

  return categoriaExistente;
};

const cadastrarProdutos = async (
  descricao,
  quantidade_estoque,
  valor,
  categoria_id
) => {
  await knex("produtos").insert({
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
  });

  return;
};

const atualizarProduto = async (
  id,
  descricao,
  quantidade_estoque,
  valor,
  categoria_id
) => {
  const produtoatualizado = await knex("produtos").where({ id }).update({
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
  });

  return produtoatualizado;
};

const listarCategoriasProd = async () => {
  const categorias = await knex("categorias");
  return categorias;
};

const obterProdutos = async () => {
  const produtos = await knex("produtos");
  return produtos;
};

const detalharProdutos = async () => {
  const produto = await knex("produtos").where({ id }).first();
  return produto;
};

const excluirPorID = async () => {
  const produto = await knex("produtos").where({ id }).del();
  return produto;
};

module.exports = {
  verificarCategoria,
  cadastrarProdutos,
  listarCategoriasProd,
  obterProdutos,
  detalharProdutos,
  excluirPorID,
  atualizarProduto,
};
