import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";

describe("testes para rota de detalhamento do cliente", () => {
  let token;

  beforeAll(async () => {
    await before();
    token = {
      authorization: `Bearer ${await tokenTest()}`,
    };
  });

  afterAll(async () => {
    await after();
  });

  it("tenta detalhar e falha porque cliente não existe", async () => {
    const resposta = await testServer
      .get("/cliente/999999999999999999999999")
      .set(token)
      .send();

    expect(resposta.body).toHaveProperty("mensagem");
    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta detalhar e consegue", async () => {
    const resposta = await testServer.get("/cliente/1").set(token).send();

    expect(resposta.body).toHaveProperty("cliente");
    expect(resposta.body).toHaveProperty("cliente.id");
    expect(resposta.body).toHaveProperty("cliente.nome");
    expect(resposta.body).toHaveProperty("cliente.email");
    expect(resposta.body).toHaveProperty("cliente.cpf");

    expect(resposta.statusCode).toEqual(200);
  });
});
