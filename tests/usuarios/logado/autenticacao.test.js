import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer } from "../../vitest.setup";
import { sign } from "jsonwebtoken";
import { senhaJwt } from "../../../src/uteis/senhas/jwt";
import {
  erroNaoAutorizado,
  erroUsuarioNaoEncontrado,
} from "../../../src/uteis/erros/mensagens";

describe("testes para intermediário de autenticação", async () => {
  let token = sign({ id: -2 }, senhaJwt, { expiresIn: "1h" });

  beforeAll(async () => {
    await before();
  });

  afterAll(async () => {
    await after();
  });

  it("tenta passar pelo intermediário mas não enviou o token", async () => {
    const resposta = await testServer.get("/usuario").send();

    expect(resposta.body).toStrictEqual({ mensagem: erroNaoAutorizado });
    expect(resposta.statusCode).toEqual(401);
  });

  it("tenta passar pelo intermediário mas o token não é válido", async () => {
    const resposta = await testServer
      .get("/usuario")
      .set({ authorization: "Bearer aaaaaaaaaaaaaaaaaaaaaaaaa" });

    expect(resposta.body).toStrictEqual({ mensagem: erroNaoAutorizado });
    expect(resposta.statusCode).toEqual(401);
  });

  it("tenta passar pelo intermediário mas o usuário não existe", async () => {
    const resposta = await testServer
      .get("/usuario")
      .set({ authorization: `Bearer ${token}` });

    expect(resposta.body).toStrictEqual({ mensagem: erroUsuarioNaoEncontrado });
    expect(resposta.statusCode).toEqual(404);
  });
});
