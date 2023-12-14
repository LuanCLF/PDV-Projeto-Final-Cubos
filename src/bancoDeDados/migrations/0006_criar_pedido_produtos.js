exports.up = function (knex) {
  return knex.schema.hasTable("pedido_produtos").then(function (exists) {
    if (!exists) {
      return knex.schema
        .createTable("pedido_produtos", function (table) {
          table.increments("id").primary();

          table
            .integer("pedido_id")
            .references("id")
            .inTable("pedidos")
            .notNullable();

          table
            .integer("produto_id")
            .references("id")
            .inTable("produtos")
            .notNullable();

          table.integer("quantidade_produto").notNullable();

          table.integer("valor_produto").notNullable();

          table.comment("tabela de pedido_produtos");
        })
        .then(() => {
          console.log("# criou a tabela de pedido_produtos");
        });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("pedido_produtos").then(() => {
    console.log("# deletou a tabela de pedido_produtos");
  });
};
