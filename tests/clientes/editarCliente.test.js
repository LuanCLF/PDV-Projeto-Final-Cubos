import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";
import {
  erroClienteNaoEncontrado,
  erroEmailOuCpfExistente,
} from "../../src/uteis/erros/mensagens";

describe("testes para rota de edição do cliente", () => {
  let token;
  const clienteObjeto = {
    nome: "joaozin do grau",
    email: "testeTesteClienteEditar@teste.com",
    cpf: "00400400404",
    cep: "59800000",
  };
  beforeAll(async () => {
    await before();
    token = {
      authorization: `Bearer ${await tokenTest()}`,
    };
  });

  afterAll(async () => {
    await after();
  });

  it("tenta editar e falha porque não enviou nada", async () => {
    const resposta = await testServer.put("/cliente/4").set(token).send();
    console.log(resposta.body);
    expect(resposta.body).toHaveProperty("mensagem");
    expect(resposta.statusCode).toEqual(400);
  });

  it("tenta editar e falha porque cliente não existe", async () => {
    const resposta = await testServer
      .put("/cliente/9999999999999999999")
      .set(token)
      .send(clienteObjeto);
    console.log(resposta.body);

    expect(resposta.body).toStrictEqual({ mensagem: erroClienteNaoEncontrado });
    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta editar e falha porque já existe um cliente com o mesmo email", async () => {
    const resposta = await testServer
      .put("/cliente/4")
      .set(token)
      .send({ ...clienteObjeto, cpf: "40040040040" });

    expect(resposta.body).toStrictEqual({ mensagem: erroEmailOuCpfExistente });
    expect(resposta.statusCode).toEqual(409);
  });

  it("tenta editar e falha porque já existe um cliente com o mesmo cpf", async () => {
    const resposta = await testServer
      .put("/cliente/4")
      .set(token)
      .send({ ...clienteObjeto, email: "testeTesteClienteEditar1@teste.com" });

    expect(resposta.body).toStrictEqual({ mensagem: erroEmailOuCpfExistente });
    expect(resposta.statusCode).toEqual(409);
  });

  it("tenta editar e consegue", async () => {
    const resposta = await testServer
      .put("/cliente/4")
      .set(token)
      .send({
        ...clienteObjeto,
        email: "testeTesteClienteEditar1@teste.com",
        cpf: "40040040040",
      });

    expect(resposta.statusCode).toEqual(204);
  });
});
