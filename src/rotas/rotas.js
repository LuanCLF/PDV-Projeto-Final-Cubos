const express = require("express");
const rotas = express();

const { controladorUsuario } = require("../controladores/index");

rotas.post("/usuario", controladorUsuario.cadastrarUsuario);
rotas.post("/login", controladorUsuario.loginUsuario);
module.exports = rotas;
