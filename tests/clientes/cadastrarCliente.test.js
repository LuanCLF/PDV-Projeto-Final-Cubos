import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";
import {
  erroCpfExistente,
  erroEmailExistente,
  erroEmailOuCpfExistente,
} from "../../src/uteis/erros/mensagens";

describe("testes para rota de criação do cliente", () => {
  let token;

  beforeAll(async () => {
    await before();
    token = {
      authorization: `Bearer ${await tokenTest("testeTesteLogin@teste.com")}`,
    };
  });

  afterAll(async () => {
    await after();
  });

  it("tenta criar e falha porque não enviou nada", async () => {
    const resposta = await testServer.post("/cliente").set(token).send();

    expect(resposta.body).toHaveProperty("mensagem");
    expect(resposta.statusCode).toEqual(400);
  });

  it("tenta criar mas não pode porque já existe um cliente com o email cadastrado", async () => {
    const resposta = await testServer.post("/cliente").set(token).send({
      nome: "joao",
      email: "testeTesteClienteCadastro@teste.com",
      cpf: "30030030030",
    });

    expect(resposta.body).toStrictEqual({
      mensagem: erroEmailOuCpfExistente,
    });
    expect(resposta.statusCode).toStrictEqual(409);
  });

  it("tenta criar mas não pode porque já existe um cliente com o cpf cadastrado", async () => {
    const resposta = await testServer.post("/cliente").set(token).send({
      nome: "joao",
      email: "testeTesteClienteCadastro1@teste.com",
      cpf: "00300300303",
    });

    expect(resposta.body).toStrictEqual({
      mensagem: erroEmailOuCpfExistente,
    });
    expect(resposta.statusCode).toEqual(409);
  });

  it("tenta criar e consegue", async () => {
    const resposta = await testServer.post("/cliente").set(token).send({
      nome: "joao",
      email: "testeTesteClienteCadastro1@teste.com",
      cpf: "30030030030",
    });

    expect(resposta.body).toHaveLength(0);
    expect(resposta.statusCode).toEqual(201);
  });
});
