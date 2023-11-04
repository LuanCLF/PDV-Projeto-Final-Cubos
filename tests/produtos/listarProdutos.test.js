import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";

describe("testes para a rota de listagem dos produto", async () => {
  const token = `Bearer ${await tokenTest()}`;
  beforeAll(async () => {
    await before();
  });

  afterAll(async () => {
    await after();
  });

  it("tenta listar os produtos e consegue", async () => {
    const resposta = await testServer
      .get("/produto")
      .set({ authorization: token });

    expect(resposta.statusCode).toEqual(200);
  });
});
