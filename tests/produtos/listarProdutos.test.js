import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";
import { erroProdutoNaoEncontrado } from "../../src/uteis/erros/mensagens";

describe("testes para a rota de listagem dos produto", async () => {
  let token;
  beforeAll(async () => {
    await before();
    token = `Bearer ${await tokenTest()}`;
  });

  afterAll(async () => {
    await after();
  });

  it("tenta listar os produtos por uma pagina que não existe", async () => {
    const resposta = await testServer
      .get("/produto?pagina=123475698789")
      .set({ authorization: token });

    expect(resposta.body).toStrictEqual({ mensagem: erroProdutoNaoEncontrado });
    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta listar os produtos com um filtro impossivel", async () => {
    const resposta = await testServer
      .get(
        "/produto?filtro[]='macaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaco&filtro[]=elefaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaanttte"
      )
      .set({ authorization: token });

    expect(resposta.body).toStrictEqual({ mensagem: erroProdutoNaoEncontrado });
    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta listar os produtos com um filtro válido", async () => {
    const resposta = await testServer
      .get("/produto?filtro[]=pto&filtro[]=r&filtro[]=a")
      .set({ authorization: token });

    expect(resposta.body).toHaveProperty("produtos");
    expect(resposta.statusCode).toEqual(200);
  });

  it("tenta listar os produtos sem filtro ou pagina e consegue", async () => {
    const resposta = await testServer
      .get("/produto")
      .set({ authorization: token });

    expect(resposta.body).toHaveProperty("produtos");
    expect(resposta.statusCode).toEqual(200);
  });
});
