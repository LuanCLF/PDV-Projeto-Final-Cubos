import { beforeAll, describe, expect, it } from "vitest";
import { testServer, tokenTest } from "../../vitest.setup";

describe("testes para a rota de edição do perfil", async () => {
  let token = `Bearer ${await tokenTest()}`;

  beforeAll(async () => {
    const resposta = await testServer.post("/login").send({
      email: "testeTesteA@gmail.com",
      senha: "senha",
    });
    token = resposta.body.token;
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
        email: "testeTesteB@gmail.com",
        senha: "senha",
      });

    expect(resposta.statusCode).toEqual(409);
  });
});
