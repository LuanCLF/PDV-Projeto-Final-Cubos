const express = require("express");
const rotas = express();

const { controladorUsuario } = require("../controladores/index");

rotas.get("/", controladorUsuario.cadastrarUsuario);

module.exports = rotas;
