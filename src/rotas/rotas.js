const express = require("express")
const rotas = express()

const autenticacao = require("../intermediarios/autenticacao/autenticacao")
const validarRequisicao = require("../intermediarios/validacaoCampo/validarRequisicao")

const cadastrarUsuario = require("../controladores/usuarios/cadastrarUsuario")
const loginUsuario = require("../controladores/usuarios/loginUsuario")
const editarPerfilUsuario = require("../controladores/usuarios/logado/editarPerfilUsuario")
const listarCategorias = require("../controladores/categorias/listarCategorias")
const detalharPerfilUsuario = require("../controladores/usuarios/logado/detalharPerfilUsuario")

const usuarioSchema = require("../schema/usuarioSchema")
const clienteSchema = require("../schema/clienteSchema")
const produtoSchema = require("../schema/produtoSchema")

const {
    cadastrarProduto,
} = require("../controladores/produtos/cadastrarProduto")
const { editarProduto } = require("../controladores/produtos/editarProduto")
const detalharProduto = require("../controladores/produtos/detalharProduto")
const listarProdutos = require("../controladores/produtos/listarProdutos")

const {
    cadastrarCliente,
} = require("../controladores/clientes/cadastrarCliente/cadastrarCliente")
const {
    detalharCliente,
} = require("../controladores/clientes/detalharCliente/detalharCliente")
const {
    editarCliente,
} = require("../controladores/clientes/editarCliente/editarCliente")
const {
    listarCliente,
} = require("../controladores/clientes/listarCliente/listarCliente")
const { excluirProduto } = require("../controladores/produtos/excluirProduto")

rotas.post(
    "/usuario",
    validarRequisicao(usuarioSchema.cadastro),
    cadastrarUsuario
)
rotas.post("/login", validarRequisicao(usuarioSchema.login), loginUsuario)
rotas.get("/categorias", listarCategorias)

rotas.use(autenticacao)

rotas.get("/usuario", detalharPerfilUsuario)
rotas.put(
    "/usuario",
    validarRequisicao(usuarioSchema.editar),
    editarPerfilUsuario
)
rotas.post(
    "/cliente",
    validarRequisicao(clienteSchema.cadastro),
    cadastrarCliente
)
rotas.get("/cliente", listarCliente)
rotas.get("/cliente/:id", detalharCliente)
rotas.put(
    "/cliente/:id",
    validarRequisicao(clienteSchema.editar),
    editarCliente
)

rotas.put(
    "/produto/:id",
    validarRequisicao(produtoSchema.editar),
    editarProduto
)
rotas.get("/produto/:id", detalharProduto)
rotas.delete("/produto/:id", excluirProduto)
rotas.post(
    "/produto",
    validarRequisicao(produtoSchema.cadastro),
    cadastrarProduto
)
rotas.get("/produto", listarProdutos)

module.exports = rotas
