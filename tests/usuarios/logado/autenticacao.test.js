import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer } from "../../vitest.setup";

describe("testes para intermediário de autenticação", () => {
  beforeAll(async () => {
    await before();
  });

  afterAll(async () => {
    await after();
  });
  it("tenta passar pelo intermediário mas não enviou o token", async () => {
    const resposta = await testServer.get("/usuario").send();

    expect(resposta.statusCode).toEqual(401);
  });

  it("tenta passar pelo intermediário mas o token não é válido", async () => {
    const resposta = await testServer
      .get("/usuario")
      .set({ authorization: "Bearer aaaaaaaaaaaaaaaaaaaaaaaaa" });

    expect(resposta.statusCode).toEqual(401);
  });
});
