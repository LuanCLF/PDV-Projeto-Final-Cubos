const { StatusCodes } = require("http-status-codes");


const postProdutos = async (req, res) =>{
    const {descricao, quantidade_estoque, valor, categoria_id} = req.body;

    fieldValidator(['descricao', 'quantidade_estoque', 'valor', 'categoria_id'], req.body)
    
    const categoria = await verificarCategoria(categoria_id)

    if(!categoria){
        res.status(StatusCodes.BAD_REQUEST).json({mensagem: "Digite um Id de categoria cadastrado!"});
    }

    await cadastrarProduto(descricao, quantidade_estoque, valor, categoria_id);

    res.status(StatusCodes.OK).json();

};

module.exports = {postProdutos};