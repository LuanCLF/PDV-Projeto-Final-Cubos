const { contencaoDeErro } = require("../../../helpers/erros/contencaoDeErro");
const { StatusCodes } = require("http-status-codes");

//tenchi quando for mexer, não precisa abrir trycatch, se estourar erro vai cair no middleware

// pra atirar erros você faz assim:

/*  if(talCoisa){
  throw conflictseilaoq("mensagem")
}  

as funções que vc pode jogar estao no arquivo erros no helpers, é o api-erros, se n tiver oq vc precisa, é só criar um, se n conseguir criar chama um de nós

ai pra usar os status code, é só importar a biblioteca StatusCodes e fazer assim

res.status(StatusCodes.OK).json(cliente)
 */

const detalharCliente = contencaoDeErro(async (req, res) => {
  //só escreve o codigo aqui sem abrir trycatch
});

module.exports = { detalharCliente };
