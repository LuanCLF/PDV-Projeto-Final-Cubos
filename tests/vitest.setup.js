const supertest = require("supertest");
const app = require("../src/server");

process.env.NODE_ENV = "test";
const testServer = supertest(app);

const tokenTest = async () => {
  const resposta = await testServer.post("/login").send({
    email: "testeTesteA@gmail.com",
    senha: "senha",
  });
  return resposta.body.token;
};

module.exports = { testServer, tokenTest };
