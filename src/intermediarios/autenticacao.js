const jwt = require("jsonwebtoken");
const knex = require("../bancoDeDados/conexao");

const hash = process.env.SENHA_JWT;

const autenticacao = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      mensagem: "Não autorizado",
    });
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    let id;
    try {
      const { id: idPayload } = jwt.verify(token, hash);
      id = idPayload;
    } catch (error) {
      return res.status(401).json({ mensagem: "Usuario não autenticado" });
    }

    const usuarioExiste = await knex("usuarios").where({ id }).first();

    if (!usuarioExiste) {
      return res.status(404).json({
        mensagem: "Usuario não encontrado",
      });
    }

    const { senha, ...usuario } = usuarioExiste;

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
};

module.exports = autenticacao;
