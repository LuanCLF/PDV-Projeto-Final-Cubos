exports.up = function (knex) {
  return knex.schema
    .createTable("categorias", (table) => {
      table.bigIncrements("id").primary().index();
      table.string("descricao").index().notNullable();

      table.comment("tabela de categorias");
    })
    .then(() => {
      console.log("# criou a tabela de categorias");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("categorias").then(() => {
    console.log("# deletou a tabela de categorias");
  });
};
