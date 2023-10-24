const knex = require("../../bancoDeDados/conexao");

const listarCategorias = async (req, res) => {
  try {
    const categorias = await knex("categorias");

    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = listarCategorias;
