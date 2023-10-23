const pg = require("pg");

const knex = require("knex")({
  client: "pg",
  connection: {
    user: "postgres",
    host: "localhost",
    database: "pdv",
    password: "postgres",
    port: 5432,
  },
});

module.exports = { knex };
