const express = require("express");
const rotas = express();

const autenticacao = require("../intermediarios/autenticacao");
const validarRequisicao = require("../intermediarios/validarRequisicao");

const cadastrarUsuario = require("../controladores/usuarios/cadastrarUsuario");
const loginUsuario = require("../controladores/usuarios/loginUsuario");
const listarCategorias = require("../controladores/categorias/listarCategorias");
const editarPerfilUsuario = require("../controladores/usuarios/logado/editarPerfilUsuario");
const detalharPerfilUsuario = require("../controladores/usuarios/logado/detalharPerfilUsuario");

const usuarioSchema = require("../schema/usuarioSchema");

rotas.post(
  "/usuario",
  validarRequisicao(usuarioSchema.cadastro),
  cadastrarUsuario
);
rotas.post("/login", validarRequisicao(usuarioSchema.login), loginUsuario);
rotas.get("/categorias", listarCategorias);

rotas.use(autenticacao);

rotas.get("/usuario", detalharPerfilUsuario);
rotas.put(
  "/usuario",
  validarRequisicao(usuarioSchema.editar),
  editarPerfilUsuario
);

module.exports = rotas;
