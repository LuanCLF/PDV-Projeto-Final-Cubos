const {
  obterCliente,
} = require("../../../provedor/clientesQuerys/queryFuncoes");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos, quantidade_produto } =
    req.body;

  res.status(200).json({
    cliente_id,
    observacao,
    pedido_produtos,
  });
  //validar se existe cliente para o id enviado no body

  const cliente = await obterCliente(100);
  console.log(cliente);
  if (!cliente) {
    console.log("cliente não existe");
  }
  //Validar se existe produto para cada produto_id informado dentro do array enviado no corpo (body) da requisição.

  //O pedido deverá ser cadastrado, apenas, se todos os produtos estiverem validados.

  // Enviar e-mail para o cliente notificando que o pedido foi efetuado com sucesso.
};
module.exports = {
  cadastrarPedido,
};
