const intermediarioDeErros = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const mensagem = err.messagem || "Erro interno no servidor";

  res.status(statusCode).json({ mensagem });
};

module.exports = intermediarioDeErros;
