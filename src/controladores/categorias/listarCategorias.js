const {
  listarCategoriasProd,
} = require("../../provedor/produtosQuerys/queryFuncoes");

const listarCategorias = async (req, res) => {
  const categorias = await listarCategoriasProd();
  res.status(200).json(categorias);
};

module.exports = listarCategorias;
