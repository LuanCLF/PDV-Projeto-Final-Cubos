const errorHandler = require("./erros/error-handler.js");
const autenticacao = require("./autenticacao/autenticacao.js");
const validarRequisicao = require("./validacaoCampo/validarRequisicao.js");

module.exports = {
  errorHandler,
  autenticacao,
  validarRequisicao,
};
