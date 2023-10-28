const {
  checarSeExiste,
  atualizarCliente,
} = require("../../../provedor/clientesQuerys/queryFuncoes");
const {
  ConflictRequestError,
} = require("../../../helpers/erros/api-errors-helpers");

const editarCliente = async (req, res) => {
  const { nome, email, cpf, cep } = req.body;
  const id = req.params.id;

  const seExiste = await checarSeExiste(cpf, email);

  if (seExiste) {
    throw ConflictRequestError("Email ou CPF já cadastrados");
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

  console.log(endereco);
  // await atualizarCliente(id, { nome, email, cpf, cep });

  // CREATE TABLE clientes (
  //   id SERIAL PRIMARY KEY NOT NULL,
  //   nome VARCHAR(100) NOT NULL,
  //   email VARCHAR(50) NOT NULL UNIQUE,
  //   cpf VARCHAR(11) NOT NULL UNIQUE,
  //   cep VARCHAR(8),
  //   rua VARCHAR(100),
  //   numero VARCHAR(10),
  //   bairro VARCHAR(100),
  //   cidade VARCHAR(100),
  //   estado VARCHAR(2)
  //   );

  res.json(endereco);
};

module.exports = { editarCliente };
