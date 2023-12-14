import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../../vitest.setup";
import { erroEmailExistente } from "../../../src/uteis/erros/mensagens";

describe("testes para a rota de edição do perfil", async () => {
  let token;

  beforeAll(async () => {
    await before();
    token = `Bearer ${await tokenTest("testeTesteEditar@teste.com")}`;
  });

  afterAll(async () => {
    await after();
  });

  it("tenta editar o perfil mas não enviou nada", async () => {
    const resposta = await testServer
      .put("/usuario")
      .set({ authorization: token })
      .send();

    expect(resposta.statusCode).toEqual(400);
  });

  it("tenta editar o perfil mas o email já existe", async () => {
    const resposta = await testServer
      .put("/usuario")
      .set({ authorization: token })
      .send({
        nome: "luan",
        email: "testeTesteCadastro@teste.com",
        senha: "senha",
      });

    expect(resposta.body).toStrictEqual({ mensagem: erroEmailExistente });
    expect(resposta.statusCode).toEqual(409);
  });

  it("tenta editar o perfil com o mesmo email do usuario logado e consegue", async () => {
    const resposta = await testServer
      .put("/usuario")
      .set({ authorization: token })
      .send({
        nome: "luan",
        email: "testeTesteEditar@teste.com",
        senha: "senha",
      });

    expect(resposta.statusCode).toEqual(204);
  });

  it("tenta editar o perfil com dados diferentes e consegue", async () => {
    const resposta = await testServer
      .put("/usuario")
      .set({ authorization: token })
      .send({
        nome: "aaaaaaaaaaaaaaaaaaa",
        email: "testeTesteEditarAAAAAAAAAAAAAAAAAAAAA@teste.com",
        senha: "senhaAAAAAAAAAAAAAAAAAAAAAAA",
      });

    expect(resposta.statusCode).toEqual(204);
  });
});
