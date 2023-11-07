const {
  obterCliente,
} = require("../../provedor/clientesQuerys/queryFuncoes");
const { qntEstoque } = require("../../provedor/pedidoQuerys/queryFuncoes");
const {
  checaSeProdutoExiste,
  obterProdutos,
} = require("../../provedor/produtosQuerys/queryFuncoes");

const cadastrarPedido = async (req, res) => {
  //   const { cliente_id, observacao, pedido_produtos } = req.body;
  //   const estoque = await qntEstoque(pedido_produtos);
  //   res.status(200).json({ estoque });
  //   //validar se existe cliente para o id enviado no body
  //   try {
  //     const cliente = await obterCliente(cliente_id);
  //     if (!cliente) {
  //       return console.log("cliente não existe");
  //     }
  //     {
  //       if (!pedido_produtos || !pedido_produtos[0]) {
  //         return res.status(404).json({ Mensagem: "sem produtos" });
  //       }
  //       //Validar se existe produto para cada produto_id informado dentro do array enviado no corpo (body) da requisição.
  //       const produtos = await obterProdutos();
  //       console.log(produtos);
  //       //       const produtosExistentes = produtos.every(({ id }, i) => {
  //       //         const { produto_id } = pedido_produtos[i];
  //       //         ///   console.log(produto_id);
  //       //         //         console.log(typeof produto_id);
  //       //         //         console.log(typeof produtos[i].id);
  //       //         //         console.log(produto_id == produtos[i].id);
  //       //       });
  //       //    console.log(produtosExistentes);
  //       //       if (!produtosExistentes) {
  //       //         return res
  //       //           .status(400)
  //       //           .json({ Mensagem: "Não é possivel registrar o pedido" });
  //       //       }
  //       //       if (produtosExistentes) {
  //       //         return res.status(201).json({ Mensagem: "Produto Registrado" });
  //       //       }
  //       //O pedido deverá ser cadastrado, apenas, se todos os produtos estiverem validados.
  //       //  registrarPedido(cliente_id, observacao, pedido_produtos);
  //       // == // await cadastrarPedido(cliente_id, observacao, pedido_produtos, quantidade_produto)
  //       // Enviar e-mail para o cliente notificando que o pedido foi efetuado com sucesso.
  //       res.status(200).json({
  //         cliente_id,
  //         observacao,
  //         pedido_produtos,
  //       });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ error: "Erro interno do servidor" });
  //   }
};
module.exports = {
  cadastrarPedido,
};
