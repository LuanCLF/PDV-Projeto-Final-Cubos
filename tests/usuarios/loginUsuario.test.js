import { describe, expect, it } from "vitest";
import { testServer } from "../vitest.setup";

describe("testes para rota de login do usuário", () => {
  it("tenta logar e falha porque não enviou nada", async () => {
    const resposta = await testServer.post("/login").send();

    expect(resposta.statusCode).toEqual(400);
  });

  it("tenta logar mas não consegue porque o usuário não existe", async () => {
    const resposta = await testServer.post("/login").send({
      email: "antedeguemon@gmail.com",
      senha: "senha",
    });

    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta logar e consegue", async () => {
    const resposta = await testServer.post("/login").send({
      email: "testeTesteB@gmail.com",
      senha: "senha",
    });
    console.log(resposta.body);
    expect(resposta.body).toHaveProperty("usuario");
    expect(resposta.body).toHaveProperty("token");

    expect(resposta.statusCode).toEqual(200);
  });
});
