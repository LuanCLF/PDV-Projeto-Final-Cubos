const supertest = require("supertest");
const app = require("../src/server");
const knex = require("../src/bancoDeDados/conexao");
process.env.NODE_ENV = "test";

const testServer = supertest(app);
process.env.NODE_ENV = "test";

const before = async () => {
  await knex.migrate.latest();
  await knex.seed.run();
};

const after = async () => {
  await knex.destroy();
};

const tokenTest = async (emailEnviado) => {
  const resposta = await testServer.post("/login").send({
    email: emailEnviado || "testeTesteLogin@teste.com",
    senha: "senha",
  });

  return resposta.body.token;
};

module.exports = { testServer, tokenTest, before, after };
