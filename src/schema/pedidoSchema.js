const joi = require("joi");

const pedidoSchema = {
  cliente_id: joi.number().positive().required().messages({
    "any.required": "O campo cliente_id é obrigatório.",
    "any.empty": "O campo cliente_id não pode estar vazio.",
    "number.base": "O campo cliente_id deve ser um número.",
    "number.positive": "O campo cliente_id deve ser um número positivo.",
  }),

  observacao: joi.string().messages({
    "string.empty": "O campo descricao não pode estar vazio.",
    "string.base": "O campo descricao deve ser um texto.",
  }),

  pedido_produtos: joi
    .array()
    .items(
      joi.object({
        produto_id: joi.number().positive().required().messages({
          "any.required": "O campo produto_id é obrigatório.",
          "any.empty": "O campo produto_id não pode estar vazio.",
          "number.base": "O campo produto_id deve ser um número.",
          "number.positive": "O campo produto_id deve ser um número positivo.",
        }),
        quantidade_produto: joi.number().positive().required().messages({
          "any.required": "O campo quantidade_produto é obrigatório.",
          "any.empty": "O campo quantidade_produto não pode estar vazio.",
          "number.base": "O campo quantidade_produto deve ser um número.",
          "number.positive":
            "O campo quantidade_produto deve ser um número positivo.",
        }),
      })
    )
    .required()
    .messages({
      "any.required": "O campo pedido_produtos é obrigatório.",
      "any.empty": "O campo pedido_produtos não pode estar vazio.",
      "array.base": "O campo pedido_produtos deve ser um array.",
    }),
};

const cadastro = joi.object(pedidoSchema);

module.exports = {
  cadastro,
};
