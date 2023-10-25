const knex = require("../bancoDeDados/conexao")
const emailExistente = async (email) => {

    const seExiste = await knex("usuarios").select("id").where("email", email);

    return seExiste;
}

const obterUsuario = async (email) => {
    const perfilEncontrado = await knex("usuarios").where("email", email);
    const usuarioExiste = await knex("usuarios").where({ id }).first()
    return perfilEncontrado;
}


const usuarioCadastrado = async (nome, email, senhaCriptografada) => {

    const cadastro = await knex("usuarios").insert({
        nome,
        email,
        senha: senhaCriptografada,
    });

    return
}

module.exports = {
    emailExistente,
    obterUsuario,
    usuarioCadastrado
};