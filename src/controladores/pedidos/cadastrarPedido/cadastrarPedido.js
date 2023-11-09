const {
  obterCliente,
} = require("../../../provedor/clientesQuerys/queryFuncoes");
const {
  qntEstoque,
  somaValor,
  registrarPedido,
} = require("../../../provedor/pedidoQuerys/queryFuncoes");
const {
  checaSeProdutoExiste,
} = require("../../../provedor/produtosQuerys/queryFuncoes");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  //validar se existe cliente para o id enviado no body
  try {
    const cliente = await obterCliente(cliente_id);

    if (!cliente) {
      return res.status(404).json({ Mensagem: "Cliente não encontrado" });
    }
    {
      if (!pedido_produtos || !pedido_produtos[0]) {
        return res.status(400).json({ Mensagem: "Insira algum produto" });
      }

      //Validar se existe produto para cada produto_id informado dentro do array enviado no corpo (body) da requisição.

      let produto = {
        produtoBoolean: true,
        produtoId: [],
      };
      async function produtoExistente(pedido_produtos) {
        for (i = 0; i < pedido_produtos.length; i++) {
          if (pedido_produtos[i]) {
            const { produto_id } = pedido_produtos[i];

            if (!Number(produto_id)) {
              return (produto.produtoBoolean = false);
            }
            produto.produtoBoolean = await checaSeProdutoExiste(produto_id);

            if (!produto.produtoBoolean) {
              produto.produtoId.push(produto_id);
            }
          }
        }

        if (produto.produtoBoolean === false) {
          return;
        }

        return produto;
      }

      if (produto.produtoBoolean === false) {
        return res.status(404).json({
          Mensagem: `Produtos : [${produto.produtoId}] Não encontrado`,
        });
      }

      // ============================================ //

      async function estoqueDisponivel(pedido_produtos) {
        let estoqueBoolean = true;

        for (let pedido of pedido_produtos) {
          const estoque = await qntEstoque(pedido.produto_id);

          if (pedido.quantidade_produto > estoque[0].quantidade_estoque) {
            return (estoqueBoolean = false);
          }
        }
        return estoqueBoolean;
      }
      const estoque = await estoqueDisponivel(pedido_produtos);

      if (estoque === false) {
        return res.status(400).json({ Mensagem: "Produto sem estoque" });
      }
      // ===========================================//
      const somaTotal = await somaValor(pedido_produtos);

      // Enviar e-mail para o cliente notificando que o pedido foi efetuado com sucesso.

      await registrarPedido(cliente_id, observacao, pedido_produtos, somaTotal);
    }
    return res.status(201).json();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
module.exports = {
  cadastrarPedido,
};
