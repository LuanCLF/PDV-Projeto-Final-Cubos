exports.seed = async (knex) => {
  const pedidos = [
    {
      cliente_id: 1,
      valor_total: 5000,
    },
  ];

  await knex("pedidos").insert(pedidos);
};
