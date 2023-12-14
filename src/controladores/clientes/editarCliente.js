const {
  atualizarCliente,

  obterCliente,
  checaSeClienteExiste,
} = require("../../provedor/clientesQuerys/queryFuncoes");
const {
  ErroDeConflito,
  ErroNaoEncontrado,
} = require("../../uteis/erros/erroDaApi");
const { StatusCodes } = require("http-status-codes");
const {
  erroClienteNaoEncontrado,
  erroEmailOuCpfExistente,
} = require("../../uteis/erros/mensagens");

const editarCliente = async (req, res) => {
  const { nome, email, cpf, cep } = req.body;
  const id = req.params.id;

  const naoExisteCliente = await obterCliente(id);

  if (naoExisteCliente) {
    throw ErroNaoEncontrado(erroClienteNaoEncontrado);
  }
  const clienteExisteComEmailOuCpf = await checaSeClienteExiste(email, cpf);

  if (clienteExisteComEmailOuCpf) {
    throw ErroDeConflito(erroEmailOuCpfExistente);
  }

  let { logradouro, ddd, bairro, localidade, uf } = await (
    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  ).json();

  const enderecoAtualizado = {
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
