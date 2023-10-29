import { describe, expect, it } from "vitest";
import { testServer, tokenTest } from "../vitest.setup";

describe("testes para a rota de deletar o produto", async () => {
  const token = `Bearer ${await tokenTest()}`;

  it("tenta deletar o produto mas ele não foi achado", async () => {
    const resposta = await testServer
      .delete("/produto/-5")
      .set({ authorization: token });

    expect(resposta.statusCode).toEqual(404);
  });
});
