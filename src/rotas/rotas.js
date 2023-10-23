const express = require("express");
const rotas = express();

const {
  cadastrarUsuario,
} = require("../controladores/usuarios/cadastrarUsuario");
const { loginUsuario } = require("../controladores/usuarios/loginUsuario");

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", loginUsuario);
module.exports = rotas;
