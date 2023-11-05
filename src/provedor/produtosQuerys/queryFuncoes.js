const knex = require("../../bancoDeDados/conexao");
const { obterClientes } = require("../clientesQuerys/queryFuncoes");

const verificarCategoria = async (id) => {
  const categoriaExistente = await knex("categorias").where({ id }).first();

  return !categoriaExistente;
};

const cadastrarProdutos = async (produto) => {
  await knex("produtos").insert(produto);

  return;
};

const checaSeProdutoExiste = async (id) => {
  const produto = await knex("produtos").where({ id }).first();

  return !produto;
};

const atualizarProduto = async (id, produto) => {
  await knex("produtos").where({ id }).update(produto);

  return;
};

const listarCategoriasProd = async () => {
  const categorias = await knex("categorias");
  return categorias;
};

const obterProdutos = async (pagina, filtro) => {
  const produtos = knex("produtos")
    .modify((query) => {
      if (filtro && filtro.length) {
        filtro.forEach((item) => {
          query.orWhereLike("descricao", `%${item}%`);
        });
      }
    })
    .offset(pagina)
    .limit(10);

  return produtos;
};

const detalharProdutos = async (id) => {
  const produto = await knex("produtos").where({ id }).first();

  return produto;
};

const excluirPorID = async (id) => {
  const produto = await knex("produtos").where({ id }).del();

  return !produto;
};

module.exports = {
  verificarCategoria,
  cadastrarProdutos,
  listarCategoriasProd,
  obterProdutos,
  detalharProdutos,
  excluirPorID,
  checaSeProdutoExiste,
  atualizarProduto,
};
