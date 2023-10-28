exports.up = function (knex) {
  return knex.schema.hasTable("produtos").then(function (exists) {
    if (!exists) {
      return knex.schema
        .createTable("produtos", function (table) {
          table.increments("id").primary();

          table.string("descricao").checkLength("<=", 255).notNullable();

          table.integer("quantidade_estoque").notNullable();

          table.integer("valor").notNullable();

          table.integer("categoria_id").references("id").inTable("categorias");

          table.comment("tabela de produtos");
        })
        .then(() => {
          console.log("# criou a tabela de produtos");
        });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("produtos").then(() => {
    console.log("# deletou a tabela de produtos");
  });
};
