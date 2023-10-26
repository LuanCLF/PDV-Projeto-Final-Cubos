import { describe, expect, it } from "vitest";
import { testServer } from "../vitest.setup";
import knex from "../../src/bancoDeDados/conexao";

describe("testes para rota de criação do usuário", () => {
  it("tenta criar e falha porque não enviou nada", async () => {
    const resposta = await testServer.post("/usuario").send();

    expect(resposta.statusCode).toEqual(400);
  });

  it("tenta criar mas não pode porque o usuário ja existe", async () => {
    const resposta = await testServer.post("/usuario").send({
      nome: "joao",
      email: "testeTesteA@gmail.com",
      senha: "senha",
    });

    expect(resposta.statusCode).toEqual(409);
  });

  it("tenta criar e consegue", async () => {
    const email = "testeTesteCadastro@teste.com";
    const resposta = await testServer.post("/usuario").send({
      nome: "testeTesteCadastro",
      email,
      senha: "senha",
    });

    expect(resposta.statusCode).toEqual(201);

    await knex("usuarios").delete().where("email", email);
  });
});
