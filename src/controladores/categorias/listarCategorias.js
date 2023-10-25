const { listarCategoriasProd } = require("../../bancoDeDados/produtosQuerys/queryFuncoesProdutos");


const listarCategorias = async (req, res) => {
  try {

    const categorias = await listarCategoriasProd()
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = {
  listarCategorias
}  