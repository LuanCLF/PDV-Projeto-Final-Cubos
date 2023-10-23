const { cadastrarUsuario } = require("./usuarios/cadastrarUsuario");
const { loginUsuario } = require("./usuarios/loginUsuario");

const controladorUsuario = { cadastrarUsuario, loginUsuario };

module.exports = { controladorUsuario };
