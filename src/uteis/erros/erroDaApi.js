const { StatusCodes } = require("http-status-codes");

const criarErroDeApi = (mensagem, statusCode) => ({
  mensagem,
  statusCode,
  nome: "erro da api",
});

const ErroDeRequisicao = (mensagem) =>
  criarErroDeApi(mensagem, StatusCodes.BAD_REQUEST);

const ErroNaoAutorizado = (mensagem) =>
  criarErroDeApi(mensagem, StatusCodes.UNAUTHORIZED);

const ErroNaoEncontrado = (mensagem) =>
  criarErroDeApi(mensagem, StatusCodes.NOT_FOUND);

const ErroSemPermissao = (mensagem) =>
  criarErroDeApi(mensagem, StatusCodes.FORBIDDEN);

const ErroDeConflito = (mensagem) =>
  criarErroDeApi(mensagem, StatusCodes.CONFLICT);

module.exports = {
  criarErroDeApi,
  ErroDeRequisicao,
  ErroNaoAutorizado,
  ErroNaoEncontrado,
  ErroSemPermissao,
  ErroDeConflito,
};
