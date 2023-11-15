exports.up = function (knex) {
  return knex.schema.hasTable("pedidos").then(function (exists) {
    if (!exists) {
      return knex.schema
        .createTable("pedidos", function (table) {
          table.increments("id").primary();

          table.integer("cliente_id").references("id").inTable("clientes");

          table.string("observacao").checkLength("<=", 255);

          table.integer("valor_total").notNullable();

          table.comment("tabela de pedidos");
        })
        .then(() => {
          console.log("# criou a tabela de pedidos");
        });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("pedidos").then(() => {
    console.log("# deletou a tabela de pedidos");
  });
};
