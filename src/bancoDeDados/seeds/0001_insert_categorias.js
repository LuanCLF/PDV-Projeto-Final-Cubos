exports.seed = async (knex) => {
  const categorias = [
    { descricao: "Informática" },
    { descricao: "Celulares" },
    { descricao: "Beleza e Perfumaria" },
    { descricao: "Mercado" },
    { descricao: "Livros e Papelaria" },
    { descricao: "Brinquedos" },
    { descricao: "Moda" },
    { descricao: "Bebê" },
    { descricao: "Games" },
  ];
  await knex("categorias").insert(categorias);
};
