import { describe, expect, it } from "vitest";
import { testServer } from "../../vitest.setup";

describe("testes para intermediário de autenticação", () => {
  it("tenta passar pelo intermediário mas não enviou token", async () => {
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
