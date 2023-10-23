const { hash } = require("bcrypt");
const { knex } = require("../../bancoDeDados/conexao");

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const seExiste = await knex("usuarios").select("id").where("email", email);

    if (seExiste.length > 0) {
      return res.status(409).json({ mensagem: "Usuário já está cadastrado" });
    }

    const senhaCriptografada = await hash(senha, 10);

    await knex("usuarios").insert({
      nome,
      email,
      senha: senhaCriptografada,
    });
    res.status(201).json();
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = { cadastrarUsuario };
