exports.seed = async (knex) => {
  const [{ count }] = await knex("produtos").count("* as count");

  if (Number.isInteger(count) && Number(count) > 0) {
    return;
  }

  const produtos = [
    {
      descricao: "celular iphone apple",
      quantidade_estoque: 3,
      valor: 5000,
      categoria_id: 2,
    },
  ];

  await knex("produtos").insert(produtos);
};
