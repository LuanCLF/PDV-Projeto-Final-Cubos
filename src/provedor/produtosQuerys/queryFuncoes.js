const knex = require("../../bancoDeDados/conexao");

const listarCategoriasProd = async () => {
  const categorias = await knex("categorias");
  return categorias;
};

const verificarCategoria = async (id) => {
  const categoriaExistente = await knex("categorias").where({ id }).first();

  return !categoriaExistente;
};

const cadastrarProdutos = async (produto) => {
  const id = await knex("produtos").insert(produto).returning("id");

  return id[0];
};

const checaSeProdutoExiste = async (id) => {
  const produto = await knex("produtos").where({ id }).first();

  return !produto;
};

const atualizarProduto = async (id, produto) => {
  await knex("produtos").where({ id }).update(produto);

  return;
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

const procurarProdutosEmPedidos = async (produto_id) => {
  const produtoPedido = await knex("pedido_produtos").where({ produto_id });

  return produtoPedido.length > 0;
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
  procurarProdutosEmPedidos,
};
