const knex = require("../../bancoDeDados/conexao")
const { detalharProdutos } = require("../produtosQuerys/queryFuncoes")

// const somaValor = await knex("produtos")
//   .sum(valor * quantidade_produto)
//   .whereIn({ id });

// const registrarPedido = async (cliente_id, observacao, pedido_produtos) => {
//   const valor_Total = pedido_produtos.forEach(
//     async ({ produto_id, quantidade_produto }) => {
//       const produto = await detalharProdutos(produto_id);

//       //   console.log(produto.valor);
//       //   const total = quantidade + prodValor
//       // obter o valor do PRODUTO, vezes quantidade,
//       // depois somar
//       //    quantidade_produto + fasfs;

//       return console.log(produto.valor);
//     }
//   );

//   const pedidoRegistrado = await knex().insert({
//     cliente_id,
//     observacao,
//     valor_Total,
//   });
//   //registrar PARA CADA PRODUTO
// };

//query para quantidade no estoque.

const qntEstoque = async (pedido_produtos) => {
    const arrayId = []
    for (let id in pedido_produtos) {
        arrayId.push(pedido_produtos[id].produto_id)
    }

    const estoque = await knex("produtos")
        .select("quantidade_estoque")
        .whereIn("id", arrayId)

    return estoque
}

const buscarPedidos = async (cliente_id) => {
    let query = knex("pedidos")
        .select(
            "pedidos.id as pedido_id",
            "pedidos.valor_total",
            "pedidos.observacao",
            "pedidos.cliente_id",
            "pedido_produtos.id as pedido_produto_id",
            "pedido_produtos.quantidade_produto",
            "pedido_produtos.valor_produto",
            "pedido_produtos.pedido_id",
            "pedido_produtos.produto_id"
        )
        .leftJoin("pedido_produtos", "pedidos.id", "pedido_produtos.pedido_id")

    if (cliente_id) {
        query = query.where("pedidos.cliente_id", cliente_id)
    }

    const pedidos = await query

    const pedidosAgrupados = []

    pedidos.forEach((pedido) => {
        const pedidoExistente = pedidosAgrupados.find(
            (p) => p.pedido.id === pedido.pedido_id
        )

        if (pedidoExistente) {
            pedidoExistente.pedido_produtos.push({
                id: pedido.pedido_produto_id,
                quantidade_produto: pedido.quantidade_produto,
                valor_produto: pedido.valor_produto,
                pedido_id: pedido.pedido_id,
                produto_id: pedido.produto_id,
            })
        } else {
            pedidosAgrupados.push({
                pedido: {
                    id: pedido.pedido_id,
                    valor_total: pedido.valor_total,
                    observacao: pedido.observacao,
                    cliente_id: pedido.cliente_id,
                },
                pedido_produtos: [
                    {
                        id: pedido.pedido_produto_id,
                        quantidade_produto: pedido.quantidade_produto,
                        valor_produto: pedido.valor_produto,
                        pedido_id: pedido.pedido_id,
                        produto_id: pedido.produto_id,
                    },
                ],
            })
        }
    })

    return pedidosAgrupados
}

module.exports = {
    qntEstoque,
    buscarPedidos,
}
