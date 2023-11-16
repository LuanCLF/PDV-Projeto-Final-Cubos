const { StatusCodes } = require("http-status-codes");
const { ErroNaoEncontrado } = require("../../uteis/erros/erroDaApi");
const { obterClientes } = require("../../provedor/clientesQuerys/queryFuncoes");
const { erroClienteNaoEncontrado } = require("../../uteis/erros/mensagens");

const listarClientes = async (req, res) => {
  let filtro = req.query.filtro;
  let pagina = Number(req.query.pagina);

  pagina = pagina < 0 || isNaN(pagina) ? 0 : pagina * 10;

  const clientes = await obterClientes(pagina, filtro);
  
  if (clientes.length < 1) {
    throw ErroNaoEncontrado(erroClienteNaoEncontrado);
  }

  res.status(StatusCodes.OK).json({ clientes });
};

module.exports = { listarClientes };
