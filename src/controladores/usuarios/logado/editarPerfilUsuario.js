const {
  obterUsuarioId,
  obterUsuarioEmail,
  atualizarUsuario,
} = require("../../../bancoDeDados/usuarioQuerys/queryFuncoes");
const criptografarSenha = require("../../../utils/criptografiaSenha");

const editarPerfilUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id, email: emailUsuario } = req.usuario;

  try {
    const usuarioExiste = await obterUsuarioId(id);

    if (!usuarioExiste) {
      return res.status(401).json({
        mensagem: "Não autorizado.",
      });
    }

    const emailUsuarioExiste = await obterUsuarioEmail(email);

    if (

      emailUsuarioExiste.length > 0
    ) {
      return res.status(409).json({
        mensagem: "O email já existe",
      });
    }

    const senhaCriptografada = await criptografarSenha(senha);

    await atualizarUsuario(id, nome, email, senhaCriptografada);
    return res.status(204).send();

  } catch (error) {
    return res.status(500).json({

      mensagem: "Erro interno do servidor.",
    });
  }
};
module.exports = editarPerfilUsuario;
