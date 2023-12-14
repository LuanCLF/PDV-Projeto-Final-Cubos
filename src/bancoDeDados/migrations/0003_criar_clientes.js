exports.up = function (knex) {
  return knex.schema.hasTable("clientes").then(function (exists) {
    if (!exists) {
      return knex.schema
        .createTable("clientes", function (table) {
          table.bigIncrements("id").primary().notNullable();

          table.string("nome").checkLength("<=", 100).notNullable();

          table.string("email").checkLength("<=", 50).unique().notNullable();

          table.string("cpf").checkLength("<=", 11).unique().notNullable();

          table.string("cep").checkLength("<=", 8);

          table.string("rua").checkLength("<=", 100);

          table.string("numero").checkLength("<=", 10);

          table.string("bairro").checkLength("<=", 100);

          table.string("cidade").checkLength("<=", 100);

          table.string("estado").checkLength("<=", 2);

          table.comment("tabela de clientes");
        })
        .then(() => {
          console.log("# criou a tabela de clientes");
        });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("clientes").then(() => {
    console.log("# deletou a tabela de clientes");
  });
};
