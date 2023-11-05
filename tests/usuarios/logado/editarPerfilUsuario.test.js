import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../../vitest.setup";

describe("testes para a rota de edição do perfil", async () => {
  let token = `Bearer ${await tokenTest()}`;

  beforeAll(async () => {
    await before();
  });

  afterAll(async () => {
    await after();
  });

  it("tenta editar o perfil mas não enviou nada", async () => {
    const resposta = await testServer
      .put("/usuario")
      .set({ authorization: token })
      .send();
    expect(resposta.statusCode).toEqual(401);
  });
});

// it("tenta editar o perfil mas o email já existe", async () => {
//   const resposta = await testServer
//     .put("/usuario")
//     .set({ authorization: token })
//     .send({
//       nome: "luan",
//   //       email: "testeTesteB@gmail.com",
//   //       senha: "senha",
//   //     });

//   expect(resposta.statusCode).toEqual(409);
//}}}}}
