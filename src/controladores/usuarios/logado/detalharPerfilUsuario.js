const knex = require("../../../bancoDeDados/conexao");
const detalharPerfilUsuario = async (req, res) => {
  try {
    const { id } = req.usuario;
    const dadosUsuarioLogado = await knex("usuarios")
      .select("nome", "email")
      .where("id", id);

    return res.status(200).json(dadosUsuarioLogado);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = detalharPerfilUsuario;
