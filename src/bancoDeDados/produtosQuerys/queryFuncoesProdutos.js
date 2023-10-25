const knex = require("../conexao")

const listarCategoriasProd = async () => {
    const categorias = await knex("categorias");
    return categorias
};

module.exports = { listarCategoriasProd }