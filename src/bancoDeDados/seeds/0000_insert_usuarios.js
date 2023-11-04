const bcrypt = require("bcrypt");

exports.seed = async (knex) => {
  const senha = await bcrypt.hash("senha", 10);
  const inserirUsuarios = [
    { nome: "testeTesteA", email: "testeTesteA@gmail.com", senha },
    { nome: "testeTesteB", email: "testeTesteB@gmail.com", senha },
  ];
  await knex("usuarios").insert(inserirUsuarios);
};
