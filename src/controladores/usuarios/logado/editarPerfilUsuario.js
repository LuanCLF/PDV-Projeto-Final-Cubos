const { obterUsuarioId, obterUsuarioEmail, atualizarUsuario } = require("../../../bancoDeDados/usuarioQuerys/queryFuncoes")
const criptografarSenha = require("../../../utils/criptografiaSenha")

const editarPerfilUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    const { id } = req.usuario

    try {
        const usuarioExiste = await obterUsuarioId(id)

        if (!usuarioExiste) {
            return res.status(401).json({
                mensagem: "Não autorizado.",
            })
        }

        const emailUsuarioExiste = await obterUsuarioEmail(email)

        if (req.usuario.email === email || emailUsuarioExiste > 1) {
            return res.status(400).json({
                mensagem: "O email já existe",
            })
        }


        const senhaCriptografada = await criptografarSenha(senha)
        const perfilAtualizado = await atualizarUsuario(id, nome, email, senhaCriptografada)

        return res.status(204).send()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            mensagem: "Erro interno do servidor.",
        })
    }
}

module.exports = {
    editarPerfilUsuario
}
