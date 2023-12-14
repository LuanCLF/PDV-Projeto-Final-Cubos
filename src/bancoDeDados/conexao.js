const config = require("knex");

const configuracaoKnex = require("./knex/enviromentBanco");
const knex = config(configuracaoKnex);
module.exports = knex;
