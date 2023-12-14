import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";
import {
  erroCategoriaNaoEncontrada,
  erroProdutoNaoEncontrado,
} from "../../src/uteis/erros/mensagens";

describe("testes para a rota de edição do produto", async () => {
  let token;
  const produto = {
    descricao: "lalalala",
    quantidade_estoque: 5,
    valor: 23,
    categoria_id: 1,
  };
  beforeAll(async () => {
    await before();
    token = `Bearer ${await tokenTest()}`;
  });

  afterAll(async () => {
    await after();
  });

  it("tenta editar um produto mas o produto não existe", async () => {
    const resposta = await testServer
      .put("/produto/-5")
      .set({ authorization: token })
      .send(produto);

    expect(resposta.body).toStrictEqual({ mensagem: erroProdutoNaoEncontrado });
    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta editar um produto mas a categoria não existe", async () => {
    const resposta = await testServer
      .put("/produto/2")
      .set({ authorization: token })
      .send({ ...produto, categoria_id: 999999999999999 });

    expect(resposta.body).toStrictEqual({
      mensagem: erroCategoriaNaoEncontrada,
    });
    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta editar um produto e consegue", async () => {
    const resposta = await testServer
      .put("/produto/2")
      .set({ authorization: token })
      .send({ ...produto, categoria_id: 4 });

    expect(resposta.statusCode).toEqual(204);
  });
});
