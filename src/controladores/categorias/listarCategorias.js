const {
  listarCategoriasProd,
} = require("../../provedor/produtosQuerys/queryFuncoes");
const { contencaoDeErro } = require("../../helpers/erros/contencaoDeErro");

const listarCategorias = contencaoDeErro(async (req, res) => {
  const categorias = await listarCategoriasProd();
  res.status(200).json(categorias);
});

module.exports = listarCategorias;
