const supertest = require("supertest");
const app = require("../src/server");
const knex = require("../src/bancoDeDados/conexao");

const testServer = supertest(app);

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
