const knex = require("../../../bancoDeDados/conexao");
const bcrypt = require("bcrypt");

const editarPerfilUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  try {
    const usuarioExiste = await knex("usuarios").where({ id }).first();

    if (!usuarioExiste) {
      return res.status(404).json({
        mensagem: "Usuario não encontrado",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    if (email !== req.usuario.email) {
      const emailUsuarioExiste = await knex("usuarios")
        .where({ email })
        .first();

      if (emailUsuarioExiste) {
        return res.status(400).json({
          mensagem: "O email já existe",
        });
      }
    }

    await knex("usuarios").where({ id }).update({
      nome,
      email,
      senha: senhaCriptografada,
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
};

module.exports = editarPerfilUsuario;
