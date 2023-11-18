const {
  clienteCadastrado,
  checaSeClienteExiste,
} = require("../../provedor/clientesQuerys/queryFuncoes");
const { StatusCodes } = require("http-status-codes");

const { ErroDeConflito } = require("../../uteis/erros/erroDaApi");
const { erroEmailOuCpfExistente } = require("../../uteis/erros/mensagens");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf } = req.body;

  const clienteExiste = await checaSeClienteExiste(email, cpf);

  if (clienteExiste) {
    throw ErroDeConflito(erroEmailOuCpfExistente);
  }

  await clienteCadastrado(nome, email, cpf);

  res.status(StatusCodes.CREATED).json();
};

module.exports = { cadastrarCliente };
