import knex from "../src/bancoDeDados/__mocks__/conexao";
import cadastrarUsu from "../src/controladores/usuarios/cadastrarUsuario";
import { obterUsuarioEmail } from "../src/provedor/usuarioQuerys/queryFuncoes";
import { obterUsuarioEmail } from "../src/provedor/usuarioQuerys/queryFuncoes";

import { vi, describe, it, expect } from "vitest";

vi.mock("../src/bancoDeDados/conexao");

describe("tentativa poha", () => {
  it("tenta ai ", async () => {
    const a = await obterUsuarioEmail("clf");
    knex.mock
    
    
    
    expect(a).to;
  });
});
