const {
  obterCliente,
} = require("../../../provedor/clientesQuerys/queryFuncoes");
const { qntEstoque } = require("../../../provedor/pedidoQuerys/queryFuncoes");
const {
  checaSeProdutoExiste,
  detalharProdutos,
} = require("../../../provedor/produtosQuerys/queryFuncoes");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  //validar se existe cliente para o id enviado no body
  try {
    const cliente = await obterCliente(cliente_id);

    if (!cliente) {
      return console.log("cliente não existe");
    }
    {
      if (!pedido_produtos || !pedido_produtos[0]) {
        return res.status(404).json({ Mensagem: "sem produtos" });
      }

      //Validar se existe produto para cada produto_id informado dentro do array enviado no corpo (body) da requisição.

      async function produtoExistente(pedido_produtos) {
        let produtoBoolean = true;

        for (i = 0; i < pedido_produtos.length; i++) {
          if (pedido_produtos[i]) {
            const { produto_id } = pedido_produtos[i];
            produtoBoolean = await checaSeProdutoExiste(produto_id);
          }
          if (produtoBoolean === false) {
            return false;
          }
        }
        return produtoBoolean;
      }

      const produtoExiste = await produtoExistente(pedido_produtos);

      if (produtoExiste === false) {
        return res
          .status(400)
          .json({ Mensagem: "Não é possivel registrar o pedido" });
      }

      // ============================================ //

      async function quantidadeEstoque(pedido_produtos) {
        let estoqueBoolean = true;

        for (let pedido of pedido_produtos) {
          const estoque = await qntEstoque(pedido.produto_id);

          if (pedido.quantidade_produto > estoque[0].quantidade_estoque) {
            console.log(
              pedido.quantidade_produto > estoque[0].quantidade_estoque
            );
          }
          return estoqueBoolean;
        }

        //         const verificarEstoque = pedido_produtos.every(
        //           ({ quantidade_produto }, i) => {
        //             console.log(estoque[i]);
        //             return quantidade_produto < estoque[i];
        //           }
        //         );
      }
      quantidadeEstoque(pedido_produtos);

      if (produtoExiste) {
        return res.status(201).json({ Mensagem: "Pedido registrado" });
      }
      //O pedido deverá ser cadastrado, apenas, se todos os produtos estiverem validados.

      //  registrarPedido(cliente_id, observacao, pedido_produtos);

      // == // await cadastrarPedido(cliente_id, observacao, pedido_produtos, quantidade_produto)

      // Enviar e-mail para o cliente notificando que o pedido foi efetuado com sucesso.

      //       res.status(200).json({
      //         cliente_id,
      //         observacao,
      //         pedido_produtos,
      //       });
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
module.exports = {
  cadastrarPedido,
};
