const {
  clienteCadastrado,
  emailCliente,
  cpfCliente,
} = require("../../provedor/clientesQuerys/queryFuncoes");
const { StatusCodes } = require("http-status-codes");

const { ErroDeConflito } = require("../../uteis/erros/erroDaApi");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf } = req.body;

  const existeEmail = await emailCliente(email);
  const existeCpf = await cpfCliente(cpf);

  if (existeEmail) {
    throw ErroDeConflito("email ja existe");
  }
  if (existeCpf) {
    throw ErroDeConflito("cpf ja existe");
  }

  await clienteCadastrado(nome, email, cpf);
  res.status(StatusCodes.CREATED).json();
};

module.exports = { cadastrarCliente };
