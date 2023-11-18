const { StatusCodes } = require("http-status-codes");
const knex = require("../../../bancoDeDados/conexao");
const {
  obterCliente,
} = require("../../../provedor/clientesQuerys/queryFuncoes");
const {
  registrarPedido,
} = require("../../../provedor/pedidoQuerys/queryFuncoes");

const {
  ErroDeConflito,
  ErroDeRequisicao,
  ErroNaoEncontrado,
} = require("../../../uteis/erros/erroDaApi");
const {
  erroClienteNaoEncontrado,
  erroEstoqueIndisponivel,
  erroProdutosNaoEncontrados,
} = require("../../../uteis/erros/mensagens");
const envioDeEmail = require("../../smtpEmail/envioDeEmail.js/emailSendler");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  const cliente = await obterCliente(cliente_id);

  if (cliente) {
    throw ErroDeConflito(erroClienteNaoEncontrado);
  }

  let naoEncontradoIds = [];

  const ids = pedido_produtos.map((item) => item.produto_id);
  const produtos = await knex("produtos").whereIn("id", ids);

  if (produtos.length !== ids.length) {
    const produtosIds = produtos.map((produto) => produto.id);
    const produtosNaoEncontrados = ids.filter(
      (id) => !produtosIds.includes(id)
    );

    naoEncontradoIds = produtosNaoEncontrados;
  }

  if (naoEncontradoIds.length > 0) {
    throw ErroNaoEncontrado(erroProdutosNaoEncontrados(naoEncontradoIds));
  }

  const semEstoque = [];
  let valor_total = 0;
  pedido_produtos.forEach((entrada) => {
    const { quantidade_produto: quantidadeEntrada, produto_id } = entrada;
    produtos.forEach((banco) => {
      const { id, quantidade_estoque, valor } = banco;
      const iguais = id === produto_id;

      if (iguais && quantidade_estoque < quantidadeEntrada) {
        semEstoque.push(id);
      } else if (iguais) {
        valor_total += valor * quantidadeEntrada;
      }
    });
  });

  if (semEstoque.length > 0) {
    throw ErroDeRequisicao(erroEstoqueIndisponivel(semEstoque));
  }

  const pedido = {
    cliente_id,
    observacao,
    valor_total,
  };
  await registrarPedido(pedido, pedido_produtos, produtos);

  const { nome, email } = req.usuario;

  envioDeEmail(nome, email).catch((erro) => console.log(erro));

  return res.status(StatusCodes.CREATED).json();
};
module.exports = {
  cadastrarPedido,
};
