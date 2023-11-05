import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";

describe("testes para a rota de excluir o produto", async () => {
  let token;
  beforeAll(async () => {
    await before();
    token = `Bearer ${await tokenTest()}`;
  });

  afterAll(async () => {
    await after();
  });

  it("tenta excluir o produto mas ele não foi achado", async () => {
    const resposta = await testServer
      .delete("/produto/-5")
      .set({ authorization: token });

    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta excluir o produto e consegue", async () => {
    const resposta = await testServer
      .delete("/produto/3")
      .set({ authorization: token });

    expect(resposta.statusCode).toEqual(204);
  });
});
