const express = require("express");
const rotas = express();

const autenticacao = require("../intermediarios/autenticacao");
const validarRequisicao = require("../intermediarios/validarRequisicao");

const {
  cadastrarUsuario,
} = require("../controladores/usuarios/cadastrarUsuario");
const { loginUsuario } = require("../controladores/usuarios/loginUsuario");
const {
  listarCategorias,
} = require("../controladores/categorias/listarCategorias");
const {
  editarPerfilUsuario,
} = require("../controladores/usuarios/logado/editarPerfilUsuario");

const usuarioSchema = require("../schema/usuarioSchema");

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", loginUsuario);
rotas.get("/categorias", listarCategorias);

rotas.use(autenticacao);

rotas.put("/usuario", validarRequisicao(usuarioSchema), editarPerfilUsuario);

module.exports = rotas;
