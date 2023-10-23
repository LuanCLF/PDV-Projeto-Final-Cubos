const express = require("express");
const rotas = express();

const {
  cadastrarUsuario,
} = require("../controladores/usuarios/cadastrarUsuario");
const { loginUsuario } = require("../controladores/usuarios/loginUsuario");
const { listarCategorias } = require("../controladores/categorias/listarCategorias");

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", loginUsuario);
rotas.get("/categorias", listarCategorias)
module.exports = rotas;
