const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const { senhaJwt } = require("../../utils/jwt");
const {
  obterUsuarioEmail,
} = require("../../bancoDeDados/usuarioQuerys/queryFuncoes");

const loginUsuario = async (req, res) => {
  try {
    const { email, senha: senhaEntrada } = req.body;

    const usuario = await obterUsuarioEmail(email);

    if (usuario.length < 1) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos" });
    }

    const { id, senha, nome } = usuario[0];
    const senhaCorreta = await compare(senhaEntrada, senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos" });
    }

    const token = jwt.sign({ id }, senhaJwt, { expiresIn: "8h" });

    res.status(200).json({ usuario: { id, nome }, token });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = loginUsuario;
