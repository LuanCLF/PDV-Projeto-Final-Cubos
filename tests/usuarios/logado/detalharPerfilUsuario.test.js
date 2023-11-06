import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../../vitest.setup";

describe("testes para a rota de detalhar perfil do usuário", async () => {
  let token;
  beforeAll(async () => {
    await before();
    token = await tokenTest();
  });

  afterAll(async () => {
    await after();
  });

  it("tenta pegar as informações e consegue", async () => {
    const resposta = await testServer
      .get("/usuario")
      .set({ authorization: `Bearer ${token}` });

    expect(resposta.body).toHaveProperty("usuario.id");
    expect(resposta.body).toHaveProperty("usuario.nome");
    expect(resposta.body).toHaveProperty("usuario.email");
    expect(resposta.statusCode).toEqual(200);
  });
});
