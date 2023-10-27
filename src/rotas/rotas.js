const express = require("express");
const rotas = express();

const autenticacao = require("../intermediarios/autenticacao/autenticacao");
const validarRequisicao = require("../intermediarios/validacaoCampo/validarRequisicao");

const cadastrarUsuario = require("../controladores/usuarios/cadastrarUsuario");
const loginUsuario = require("../controladores/usuarios/loginUsuario");
const editarPerfilUsuario = require("../controladores/usuarios/logado/editarPerfilUsuario");
const listarCategorias = require("../controladores/categorias/listarCategorias");
const detalharPerfilUsuario = require("../controladores/usuarios/logado/detalharPerfilUsuario");

const usuarioSchema = require("../schema/usuarioSchema");
const {
  cadastrarProduto,
} = require("../controladores/produtos/cadastrarProduto");
const { editarProduto } = require("../controladores/produtos/editarProduto");
const detalharProduto = require("../controladores/produtos/detalharProduto");
const listarProdutos = require("../controladores/produtos/listarProdutos");
const { excluirPorID } = require("../provedor/produtosQuerys/queryFuncoes");
const { cadastrarCliente } = require("../controladores/clientes/cadastrarCliente/cadastrarCliente");
const { detalharCliente } = require("../controladores/clientes/detalharCliente/detalharCliente");
const { editarCliente } = require("../controladores/clientes/editarCliente/editarCliente");
const { listarCliente } = require("../controladores/clientes/listarCliente/listarCliente");

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
rotas.post("/cliente", cadastrarCliente)
rotas.get("/cliente", listarCliente)
rotas.get("/clientes/:id", detalharCliente)
rotas.put("/cliente/:id", editarCliente)

rotas.post("/produto", cadastrarProduto);
rotas.post("/produto/:id", editarProduto);
rotas.get("/produto/:id", detalharProduto);
rotas.get("/produto", listarProdutos);
rotas.delete("/produto/:id", excluirPorID);

module.exports = rotas;
