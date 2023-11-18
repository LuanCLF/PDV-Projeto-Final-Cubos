exports.seed = async (knex) => {
  const produtos = [
    {
      descricao: "celoroid iphono javoscripto",
      quantidade_estoque: 3,
      valor: 5000,
      categoria_id: 2,
    },
    {
      descricao: "editarrrrr",
      quantidade_estoque: 3,
      valor: 5000,
      categoria_id: 2,
    },
    {
      descricao: "produto pra ser vinculado a pedido",
      quantidade_estoque: 3,
      valor: 5000,
      categoria_id: 1,
    },
    {
      descricao: "deletarrrrr",
      quantidade_estoque: 4,
      valor: 2000,
      categoria_id: 3,
    },
  ];

  await knex("produtos").insert(produtos);
};
