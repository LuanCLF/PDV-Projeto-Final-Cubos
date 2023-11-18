import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";
import {
  erroClienteNaoEncontrado,
  erroEstoqueIndisponivel,
  erroProdutosNaoEncontrados,
} from "../../src/uteis/erros/mensagens";

describe("testes para a rota de cadastro do pedido", async () => {
  let token;
  const pedido = {
    cliente_id: 999999999999999,
    observacao: "Em caso de ausência recomendo deixar com algum vizinho",
    pedido_produtos: [
      {
        produto_id: 1,
        quantidade_produto: 10,
      },
      {
        produto_id: 5,
        quantidade_produto: 10,
      },
      {
        produto_id: 2,
        quantidade_produto: 10,
      },
      {
        produto_id: 545454,
        quantidade_produto: 20,
      },
    ],
  };
  const pedido2 = {
    cliente_id: 1,
    observacao: "Em caso de ausência recomendo deixar com algum vizinho",
    pedido_produtos: [
      {
        produto_id: 1,
        quantidade_produto: 10,
      },
      {
        produto_id: 2,
        quantidade_produto: 1,
      },
      {
        produto_id: 3,
        quantidade_produto: 20,
      },
    ],
  };
  const pedido3 = {
    cliente_id: 1,
    observacao: "Em caso de ausência recomendo deixar com algum vizinho",
    pedido_produtos: [
      {
        produto_id: 1,
        quantidade_produto: 1,
      },
      {
        produto_id: 2,
        quantidade_produto: 1,
      },
      {
        produto_id: 3,
        quantidade_produto: 2,
      },
    ],
  };
  beforeAll(async () => {
    await before();
    token = `Bearer ${await tokenTest()}`;
  });

  afterAll(async () => {
    await after();
  });

  it("tenta cadastrar um pedido mas não enviou nada", async () => {
    const resposta = await testServer
      .post("/pedido")
      .set({ authorization: token })
      .send();

    expect(resposta.statusCode).toEqual(400);
  });

  it("tenta cadastrar um pedido mas o cliente não existe", async () => {
    const resposta = await testServer
      .post("/pedido")
      .set({ authorization: token })
      .send({ ...pedido, cliente_id: 999999999999 });

    expect(resposta.body).toStrictEqual({ mensagem: erroClienteNaoEncontrado });
    expect(resposta.statusCode).toEqual(409);
  });

  it("tenta cadastrar um pedido mas o produto não existe", async () => {
    const resposta = await testServer
      .post("/pedido")
      .set({ authorization: token })
      .send({ ...pedido, cliente_id: 1 });

    expect(resposta.body).toStrictEqual({
      mensagem: erroProdutosNaoEncontrados([5, 545454]),
    });
    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta cadastrar um pedido mas não tem estoque suficiente", async () => {
    const resposta = await testServer
      .post("/pedido")
      .set({ authorization: token })
      .send(pedido2);

    expect(resposta.body).toStrictEqual({
      mensagem: erroEstoqueIndisponivel([1, 3]),
    });
    expect(resposta.statusCode).toEqual(400);
  });

  it("tenta cadastrar um pedido e consegue", async () => {
    const resposta = await testServer
      .post("/pedido")
      .set({ authorization: token })
      .send(pedido3);

    expect(resposta.statusCode).toEqual(201);
  });
});
