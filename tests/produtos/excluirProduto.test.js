import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";
import { erroProdutoVinculado } from "../../src/uteis/erros/mensagens";

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

  it("tenta excluir o produto mas ele está vinculado a um pedido", async () => {
    const resposta = await testServer
      .delete("/produto/3")
      .set({ authorization: token });

    expect(resposta.body).toStrictEqual({ mensagem: erroProdutoVinculado });
    expect(resposta.statusCode).toEqual(409);
  });

  it("tenta excluir o produto e consegue", async () => {
    const resposta = await testServer
      .delete("/produto/4")
      .set({ authorization: token });

    expect(resposta.statusCode).toEqual(204);
  });
});
