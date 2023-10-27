const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno no servidor";

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
