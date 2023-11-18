import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";
import { erroProdutoNaoEncontrado } from "../../src/uteis/erros/mensagens";

describe("testes para a rota de detalhar o produto", async () => {
  let token;
  beforeAll(async () => {
    await before();
    token = `Bearer ${await tokenTest()}`;
  });

  afterAll(async () => {
    await after();
  });

  it("tenta detalhar um produto mas ele não existe", async () => {
    const resposta = await testServer
      .get("/produto/-5")
      .set({ authorization: token });

    expect(resposta.body).toStrictEqual({ mensagem: erroProdutoNaoEncontrado });
    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta detalhar um produto e consegue", async () => {
    const resposta = await testServer
      .get("/produto/1")
      .set({ authorization: token });

    expect(resposta.body).toHaveProperty("produto");
    expect(resposta.body).toHaveProperty("produto.id");
    expect(resposta.body).toHaveProperty("produto.descricao");
    expect(resposta.body).toHaveProperty("produto.produto_imagem");
    expect(resposta.body).toHaveProperty("produto.quantidade_estoque");
    expect(resposta.body).toHaveProperty("produto.valor");
    expect(resposta.body).toHaveProperty("produto.categoria_id");

    expect(resposta.statusCode).toEqual(200);
  });
});
