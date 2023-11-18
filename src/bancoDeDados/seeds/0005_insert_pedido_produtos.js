exports.seed = async (knex) => {
  const pedido_produtos = [
    {
      pedido_id: 1,
      produto_id: 3,
      quantidade_produto: 2,
      valor_produto: 500,
    },
  ];

  await knex("pedido_produtos").insert(pedido_produtos);
};
