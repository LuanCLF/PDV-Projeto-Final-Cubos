const supertest = require("supertest");
const app = require("../src/server");

const testServer = supertest(app);

process.env.NODE_ENV = "test";

const token = async () => {
  const resposta = await testServer.post("/login").send({
    email: "testeTesteA@gmail.com",
    senha: "senha",
  });
  token = resposta.body.token;
};

module.exports = { testServer, token };
