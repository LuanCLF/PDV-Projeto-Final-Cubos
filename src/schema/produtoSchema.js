const joi = require("joi")

const produtoSchema = {
    descricao: joi.string().required().messages({
        "any.required": "O campo descricao é obrigatório.",
        "string.empty": "O campo descricao não pode estar vazio.",
        "string.base": "O campo descricao deve ser um texto.",
    }),

    quantidade_estoque: joi.number().positive().allow(0).required().messages({
        "any.required": "O campo quantidade_estoque é obrigatório.",
        "any.empty": "O campo quantidade_estoque não pode estar vazio.",
        "number.base": "O campo quantidade_estoque deve ser um número.",
        "number.positive":
            "O campo quantidade_estoque deve ser um número positivo.",
    }),

    valor: joi.number().required().positive().messages({
        "any.required": "O campo valor é obrigatório.",
        "any.empty": "O campo valor não pode estar vazio.",
        "number.base": "O campo valor deve ser um número.",
        "number.positive": "O campo valor deve ser um número positivo.",
    }),

    categoria_id: joi.number().positive().required().messages({
        "any.required": "O campo categoria_id é obrigatório.",
        "any.empty": "O campo categoria_id não pode estar vazio.",
        "number.base": "O campo categoria_id deve ser um número.",
        "number.positive": "O campo categoria_id deve ser um número positivo.",
    }),
}

const cadastro = joi.object(produtoSchema)
const editar = joi.object(produtoSchema)

module.exports = {
    cadastro,
    editar,
}
