import { describe, expect, it } from "vitest";
import { testServer, tokenTest } from "../vitest.setup";
import knex from "../../src/bancoDeDados/conexao";

describe("testes para a rota de cadastro do produto", async () => {
  const token = `Bearer ${await tokenTest()}`;

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

    await knex("produtos")
      .where("descricao", "testelindo e maravilhoso(eu)")
      .delete();
    expect(resposta.statusCode).toEqual(201);
  });
});
