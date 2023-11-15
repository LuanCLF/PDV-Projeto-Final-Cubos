exports.seed = async (knex) => {
  const inserirClientes = [
    {
      nome: "testeTesteClienteA",
      email: "testeTesteClienteA@gmail.com",
      cpf: "00100100101",
    },
    {
      nome: "testeTesteClienteB",
      email: "testeTesteClienteB@gmail.com",
      cpf: "00200200202",
    },
    {
      nome: "testeTesteClienteC",
      email: "testeTesteClienteCadastro@teste.com",
      cpf: "00300300303",
    },
    {
      nome: "testeTesteClienteD",
      email: "testeTesteClienteEditar@teste.com",
      cpf: "00400400404",
    },
  ];
  await knex("clientes").insert(inserirClientes);
};
