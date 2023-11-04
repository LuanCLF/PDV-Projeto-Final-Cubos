import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";


describe("testes para a rota de cadastro do produto", async () => {
  const token = `Bearer ${await tokenTest()}`;
  beforeAll(async () => {
    await before();
  });

  afterAll(async () => {
    await after();
  });

  it("tenta cadastrar um produto mas a categoria não existe", async () => {
    const resposta = await testServer
      .post("/produto")
      .set({ authorization: token })
      .send({ categoria_id: -6 });

    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta cadastrar um produto e consegue", async () => {
    const resposta = await testServer
      .post("/produto")
      .set({ authorization: token })
      .send({
        descricao: "testelindo e maravilhoso(eu)",
        quantidade_estoque: 2,
        valor: 123,
        categoria_id: 1,
      });
      
    expect(resposta.body).toEqual(402);
    expect(resposta.statusCode).toEqual(402);
  });
});
