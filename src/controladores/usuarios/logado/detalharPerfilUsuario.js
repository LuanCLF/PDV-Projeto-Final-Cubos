const { obterUsuarioId } = require("../../../bancoDeDados/usuarioQuerys/queryFuncoes");

const detalharPerfilUsuario = async (req, res) => {
    try {
        const { id } = req.usuario

        const perfilUsuario = await obterUsuarioId(id)

        if (!perfilUsuario) {
            return res.status(401).json(
                { mensagem: "Usuário não autorizado" })
        }

        return res.status(200).json(req.usuario)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = detalharPerfilUsuario;