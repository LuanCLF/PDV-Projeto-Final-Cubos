exports.up = function (knex) {
  return knex.schema
    .createTable("usuarios", (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome").index().notNullable();
      table.string("email").unique().index().notNullable();
      table.string("senha").index().notNullable();

      table.comment("tabela de usuarios");
    })
    .then(() => {
      console.log("# criou a tabela de usuarios");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("usuarios").then(() => {
    console.log("# deletou a tabela de usuarios");
  });
};
