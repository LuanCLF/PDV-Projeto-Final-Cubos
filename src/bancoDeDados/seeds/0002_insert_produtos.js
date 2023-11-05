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
  ];

  await knex("produtos").insert(produtos);
};
