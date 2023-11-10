import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";
import { erroCategoriaNaoEncontrada } from "../../src/uteis/erros/mensagens";

describe("testes para a rota de cadastro do produto", async () => {
  let token;
  const produto = {
    categoria_id: 999999999999999,
    descricao: "aaa",
    quantidade_estoque: 2,
    valor: 25,
  };
  beforeAll(async () => {
    await before();
    token = `Bearer ${await tokenTest()}`;
  });

  afterAll(async () => {
    await after();
  });

  it("tenta cadastrar um produto mas não enviou nada", async () => {
    const resposta = await testServer
      .post("/produto")
      .set({ authorization: token })
      .send();

    expect(resposta.statusCode).toEqual(400);
  });

  it("tenta cadastrar um produto mas a categoria não existe", async () => {
    const resposta = await testServer
      .post("/produto")
      .set({ authorization: token })
      .send(produto);

    expect(resposta.body).toStrictEqual({
      mensagem: erroCategoriaNaoEncontrada,
    });
    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta cadastrar um produto e consegue", async () => {
    const resposta = await testServer
      .post("/produto")
      .set({ authorization: token })
      .send({ ...produto, categoria_id: 1 });

    expect(resposta.statusCode).toEqual(201);
  });
});
