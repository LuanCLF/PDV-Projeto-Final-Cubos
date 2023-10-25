exports.up = function (knex) {
  return knex.schema.hasTable("categorias").then(function (exists) {
    if (!exists) {
      return knex.schema
        .createTable("categorias", function (table) {
          table.bigIncrements("id").primary().index();
          table
            .string("descricao")
            .checkLength("<=", 100)
            .index()
            .notNullable();

          table.comment("tabela de categorias");
        })
        .then(() => {
          console.log("# criou a tabela de categorias");
        });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("categorias").then(() => {
    console.log("# deletou a tabela de categorias");
  });
};
