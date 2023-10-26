exports.up = function (knex) {
  return knex.schema.hasTable("usuarios").then(function (exists) {
    if (!exists) {
      return knex.schema
        .createTable("usuarios", function (table) {
          table.bigIncrements("id").primary().index();
          table.string("nome").checkLength("<=", 100).index().notNullable();
          table
            .string("email")
            .checkLength("<=", 50)
            .unique()
            .index()
            .notNullable();
          table.string("senha").checkLength("<=", 255).index().notNullable();

          table.comment("tabela de usuarios");
        })
        .then(() => {
          console.log("# criou a tabela de usuarios");
        });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("usuarios").then(() => {
    console.log("# deletou a tabela de usuarios");
  });
};
