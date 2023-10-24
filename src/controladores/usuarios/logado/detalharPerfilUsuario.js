const { knex } = require("../../bancoDeDados/conexao");

const detalharPerfilUsuario = async (req, res) =>{
    try {
        const {id} = req.usuario.id
        const dadosUsuarioLogado = await knex("usuarios").select("id").where("id", id);

        return res.json(dadosUsuarioLogado)

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = detalharPerfilUsuario;