const express = require("express");
const rotas = express();

const autenticacao = require("../intermediarios/autenticacao/autenticacao");
const validarRequisicao = require("../intermediarios/validacaoCampo/validarRequisicao");

const cadastrarUsuario = require("../controladores/usuarios/cadastrarUsuario");
const loginUsuario = require("../controladores/usuarios/loginUsuario");
const editarPerfilUsuario = require("../controladores/usuarios/logado/editarPerfilUsuario");
const listarCategorias = require("../controladores/categorias/listarCategorias");
const detalharPerfilUsuario = require("../controladores/usuarios/logado/detalharPerfilUsuario");

// const listarProdutos = require("../controladores/produtos/listarProdutos");
// const {
//   excluirPorID,
// } = require("../bancoDeDados/produtosQuerys/queryFuncoesProdutos");

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
// rotas.post("/produto", postProdutos);
// rotas.post("/produto/:id", putProdutos);
// rotas.get("/produto", listarProdutos);
// rotas.get("/produto/:id", detalharProduto);
// rotas.delete("/produto/:id", excluirPorID);

module.exports = rotas;
