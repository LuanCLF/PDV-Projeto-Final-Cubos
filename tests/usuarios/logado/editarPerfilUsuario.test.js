import { beforeAll, describe, expect, it } from "vitest";
import { testServer } from "../../vitest.setup";

describe("testes para a rota de edição do perfil", () => {
  let token = "";

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
      .set({ authorization: `Bearer ${token}` })
      .send();
    expect(resposta.statusCode).toEqual(400);
  });

  it("tenta editar o perfil mas o email já existe", async () => {
    const resposta = await testServer
      .put("/usuario")
      .set({ authorization: `Bearer ${token}` })
      .send({
        nome: "luan",
        email: "testeTesteB@gmail.com",
        senha: "senha",
      });

    expect(resposta.statusCode).toEqual(409);
  });
});
