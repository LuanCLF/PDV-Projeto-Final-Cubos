import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";
import { erroClienteNaoEncontrado } from "../../src/uteis/erros/mensagens";

describe("testes para a rota de listagem dos clientes", async () => {
  let token;
  beforeAll(async () => {
    await before();
    token = `Bearer ${await tokenTest()}`;
  });

  afterAll(async () => {
    await after();
  });

  it("tenta listar os clientes por uma pagina que não existe", async () => {
    const resposta = await testServer
      .get("/cliente?pagina=123475698789")
      .set({ authorization: token });

    expect(resposta.body).toStrictEqual({ mensagem: erroClienteNaoEncontrado });
    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta listar os clientes com um filtro impossivel", async () => {
    const resposta = await testServer
      .get(
        "/cliente?filtro[]='macaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaco&filtro[]=elefaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaanttte"
      )
      .set({ authorization: token });

    expect(resposta.body).toStrictEqual({ mensagem: erroClienteNaoEncontrado });
    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta listar os clientes com um filtro válido", async () => {
    const resposta = await testServer
      .get("/cliente?filtro[]=tes&filtro[]=A&filtro[]=D")
      .set({ authorization: token });
    
    expect(resposta.body).toHaveProperty("clientes");
    expect(resposta.statusCode).toEqual(200);
  });

  it("tenta listar os clientes sem filtro ou pagina e consegue", async () => {
    const resposta = await testServer
      .get("/cliente")
      .set({ authorization: token });

    expect(resposta.body).toHaveProperty("clientes");
    expect(resposta.statusCode).toEqual(200);
  });
});
