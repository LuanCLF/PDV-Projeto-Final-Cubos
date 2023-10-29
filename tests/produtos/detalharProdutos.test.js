import { describe, expect, it } from "vitest";
import { testServer, tokenTest } from "../vitest.setup";

describe("testes para a rota de detalhar o produto", async () => {
  const token = `Bearer ${await tokenTest()}`;

  it("tenta detalhar um produto mas ele não existe", async () => {
    const resposta = await testServer
      .get("/produto/-5")
      .set({ authorization: token });

    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta detalhar um produto e consegue", async () => {
    const resposta = await testServer
      .get("/produto/1")
      .set({ authorization: token })
      .send({ categoria_id: 1 });

    expect(resposta.statusCode).toEqual(200);
  });
});
