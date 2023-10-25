const knex = require("../conexao")

const emailExistente = async (email) => {

    const emailUsuario = await knex("usuarios").select("id").where("email", email);

    return emailUsuario;
}

const obterUsuarioEmail = async (email) => {

    const perfilEncontradoEmail = await knex("usuarios").where("email", email);

    return perfilEncontradoEmail

}

const obterUsuarioId = async (id) => {
    const perfilEncontradoId = await knex("usuarios").where({ id }).first()

    return perfilEncontradoId
}

const usuarioCadastrado = async (nome, email, senhaCriptografada) => {

    const perfilCadastrado = await knex("usuarios").insert({
        nome,
        email,
        senha: senhaCriptografada,
    });

    return
}


const atualizarUsuario = async (id, nome, email, senhaCriptografada) => {
    const perfilUsuario = await knex("usuarios").where({ id }).update({
        nome,
        email,
        senha: senhaCriptografada,
    })
    return perfilUsuario

}


module.exports = {
    emailExistente,
    obterUsuarioEmail,
    obterUsuarioId,
    usuarioCadastrado,
    atualizarUsuario
};