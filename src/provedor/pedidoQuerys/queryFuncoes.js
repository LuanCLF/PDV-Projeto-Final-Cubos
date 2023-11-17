const knex = require("../../bancoDeDados/conexao");
const { detalharProdutos } = require("../produtosQuerys/queryFuncoes");

const somaValor = async (pedido_produtos) => {
  let valorTotal = 0;
  for (let pedido of pedido_produtos) {
    if (pedido_produtos.length) {
      const s = await knex("produtos")
        .sum("valor")
        .where("id", pedido.produto_id)
        .first();
      valorTotal += s.sum * pedido.quantidade_produto;
    }
    if (pedido_produtos.length === 0) {
      valorTotal = 0;
    }
  }
  return valorTotal;
};

const registrarPedido = async (pedido, pedido_produtos, produtos) => {
  const pedidoRegistrado = await knex("pedidos").insert(pedido).returning("id");

  const produtosParaInserir = pedido_produtos.map(
    ({ produto_id, quantidade_produto }) => {
      const produto = produtos.find((p) => p.id === produto_id);

      return {
        pedido_id: pedidoRegistrado[0].id,
        produto_id: produto.id,
        quantidade_produto: quantidade_produto,
        valor_produto: produto.valor,
      };
    }
  );

  await knex("pedido_produtos").insert(produtosParaInserir);
};

const qntEstoque = async (produto_id) => {
  const estoque = await knex("produtos")
    .select("quantidade_estoque")
    .where("id", produto_id);

  return estoque;
};

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
    .leftJoin("pedido_produtos", "pedidos.id", "pedido_produtos.pedido_id");

  if (cliente_id) {
    query = query.where("pedidos.cliente_id", cliente_id);
  }

  const pedidos = await query;

  const pedidosAgrupados = [];

  pedidos.forEach((pedido) => {
    const pedidoExistente = pedidosAgrupados.find(
      (p) => p.pedido.id === pedido.pedido_id
    );

    if (pedidoExistente) {
      pedidoExistente.pedido_produtos.push({
        id: pedido.pedido_produto_id,
        quantidade_produto: pedido.quantidade_produto,
        valor_produto: pedido.valor_produto,
        pedido_id: pedido.pedido_id,
        produto_id: pedido.produto_id,
      });
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
      });
    }
  });

  return pedidosAgrupados;
};

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

module.exports = {
  qntEstoque,
  buscarPedidos,
  somaValor,
  registrarPedido,
  estoqueDisponivel,
};
