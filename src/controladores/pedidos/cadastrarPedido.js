const {
  obterCliente,
  detalharClientes,
} = require("../../provedor/clientesQuerys/queryFuncoes");
const {
  qntEstoque,
  somaValor,
  registrarPedido,
  estoqueDisponivel,
} = require("../../provedor/pedidoQuerys/queryFuncoes");
const {
  checaSeProdutoExiste,
} = require("../../provedor/produtosQuerys/queryFuncoes");
const a = require('../../')
const envioDeEmail = require("../../smtpEmail/envioDeEmail.js/emailSendler");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  // try {
  const cliente = await obterCliente(cliente_id);

  if (!cliente) {
    return res.status(404).json({ Mensagem: "Cliente não encontrado" });
  }

  if (!pedido_produtos || !pedido_produtos[0]) {
    return res.status(400).json({ Mensagem: "Insira algum produto" });
  }

  //   let produto = {
  //     produtoBoolean: true,
  //     produtoId: [],
  //   };
  //   async function produtoExistente(pedido_produtos) {
  //     for (i = 0; i < pedido_produtos.length; i++) {
  //       if (pedido_produtos[i]) {
  //         const { produto_id } = pedido_produtos[i];

  //         if (!Number(produto_id)) {
  //           return (produto.produtoBoolean = false);
  //         }
  //         produto.produtoBoolean = await checaSeProdutoExiste(produto_id);

  //         if (!produto.produtoBoolean) {
  //           produto.produtoId.push(produto_id);
  //         }
  //       }
  //     }

  //     if (produto.produtoBoolean === false) {
  //       return;
  //     }

  //     return produto;
  //   }

  //   if (produto.produtoBoolean === false) {
  //     return res.status(404).json({
  //       Mensagem: `Produtos : [${produto.produtoId}] Não encontrado`,
  //     });
  //   }

  //   const estoque = await estoqueDisponivel(pedido_produtos);

  //   if (estoque === false) {
  //     return res.status(400).json({ Mensagem: "Produto sem estoque" });
  //   }

  //   const somaTotal = await somaValor(pedido_produtos);

  //   await registrarPedido(cliente_id, observacao, pedido_produtos, somaTotal);

  //   const { nome, email } = await detalharClientes(cliente_id);

  //   await envioDeEmail(nome, email);

  //   return res.status(201).json();
  // } catch (error) {
  //   console.log(error.message);
  //   return res.status(500).json({ error: "Erro interno do servidor" });
  // }
};
module.exports = {
  cadastrarPedido,
};
