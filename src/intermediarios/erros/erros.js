const intermediarioDeErros = (err, req, res, next) => {
  console.log(err.message, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", err);
  const statusCode = err.statusCode || 500;
  const mensagem = err.mensagem || "Erro interno no servidor";

  res.status(statusCode).json({ mensagem });
};

module.exports = intermediarioDeErros;
