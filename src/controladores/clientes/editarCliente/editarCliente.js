const {
  atualizarCliente,
  emailCliente,
  cpfCliente,
  obterCliente,
} = require("../../../provedor/clientesQuerys/queryFuncoes");
const {
  ErroDeConflito,
  ErroNaoEncontrado,
} = require("../../../uteis/erros/erroDaApi");
const { StatusCodes } = require("http-status-codes");

const editarCliente = async (req, res) => {
  const { nome, email, cpf, cep } = req.body;
  const id = req.params.id;

  const naoExisteCliente = await obterCliente(id);

  if (naoExisteCliente) {
    throw ErroNaoEncontrado("Cliente não existe");
  }

  const existeEmail = await emailCliente(email);
  const existeCpf = await cpfCliente(cpf);

  if (existeEmail) {
    throw ErroDeConflito("email ja existe");
  }
  if (existeCpf) {
    throw ErroDeConflito("cpf ja existe");
  }

  let { logradouro, ddd, bairro, localidade, uf } = await (
    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  ).json();
  enderecoAtualizado = {
    cep,
    rua: logradouro,
    numero: ddd,
    bairro: bairro,
    cidade: localidade,
    estado: uf,
  };

  await atualizarCliente(id, { nome, email, cpf, ...enderecoAtualizado });

  res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = { editarCliente };
