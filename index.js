const app = require("./src/server");

app.listen(
  process.env.PORT,
  console.log(`Servidor on na porta ${process.env.PORT}`)
);
