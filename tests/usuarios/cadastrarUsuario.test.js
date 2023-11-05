import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer } from "../vitest.setup";
import { erroEmailExistente } from "../../src/uteis/erros/mensagens";

describe("testes para rota de criação do usuário", () => {
  const email = "testeTesteCadastro1@teste.com";

  beforeAll(async () => {
    await before();
  });

  afterAll(async () => {
    await after();
  });

  it("tenta criar e falha porque não enviou nada", async () => {
    const resposta = await testServer.post("/usuario").send();

    expect(resposta.body).toHaveProperty("mensagem");
    expect(resposta.statusCode).toEqual(400);
  });

  it("tenta criar mas não pode porque o usuário ja existe", async () => {
    const resposta = await testServer.post("/usuario").send({
      nome: "joao",
      email: "testeTesteCadastro@teste.com",
      senha: "senha",
    });

    expect(resposta.body).toStrictEqual({
      mensagem: erroEmailExistente,
    });
    expect(resposta.statusCode).toStrictEqual(409);
  });

  it("tenta criar e consegue", async () => {
    const resposta = await testServer.post("/usuario").send({
      nome: "testeTesteCadastro",
      email,
      senha: "senha",
    });
    
    expect(resposta.body).toHaveLength(0);
    expect(resposta.statusCode).toEqual(201);
  });
});
