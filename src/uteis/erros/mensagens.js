const mensagemDeErro = {
  erroEmailExistente: "O email já está cadastrado!",
  erroEmailOuCpfExistente: "O email ou cpf já está cadastrado!",
  erroEmailOuSenhaInvalidos: "Email ou senha inválidos!",
  erroNaoAutorizado: "Usuário não autorizado!",
  erroUsuarioNaoEncontrado: "Usuário não encontrado.",
  erroClienteNaoEncontrado: "Cliente não encontrado.",
  erroCategoriaNaoEncontrada: "Categoria não encontrada.",
  erroProdutoNaoEncontrado: "Produto não encontrado.",
  erroProdutoVinculado:
    "O Produto está vinculado á algum pedido, não pode ser excluido.",
  erroProdutosNaoEncontrados: (produtos) =>
    `Os seguintes produtos não foram encontrados: [${produtos}]`,
  erroEstoqueIndisponivel: (ids) =>
    `Os seguintes produtos estão com estoque indisponivel: [${ids}]`,
};

module.exports = { ...mensagemDeErro };
