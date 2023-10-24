const knex = require("knex");

const configuracaoKnex = require("./knex/enviromentBanco");

module.exports = knex(configuracaoKnex);
