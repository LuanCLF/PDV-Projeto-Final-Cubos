import { beforeAll, describe, expect, it } from "vitest";
import { testServer } from "../../vitest.setup";

describe("testes para a rota de detalhar perfil do usuário", () => {
  let token = "";
  beforeAll(async () => {
    const resposta = await testServer.post("/login").send({
      email: "testeTesteA@gmail.com",
      senha: "senha",
    });
    token = resposta.body.token;
  });

  it("tenta pegar as informações e consegue", async () => {
    const resposta = await testServer
      .get("/usuario")
      .set({ authorization: `Bearer ${token}` });

    expect(resposta.body).toHaveProperty("id");
    expect(resposta.body).toHaveProperty("nome");
    expect(resposta.body).toHaveProperty("email");
    expect(resposta.statusCode).toEqual(200);
  });
});
