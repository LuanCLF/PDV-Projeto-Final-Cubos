const joi = require("joi")

const usuarioSchema = joi.object({
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório.",
        "string.empty": "O campo nome não pode estar vazio.",
    }),

    email: joi.string().email().required().unique().messages({
        "any.required": "O campo email é obrigatório.",
        "string.empty": "O campo email não pode estar vazio.",
        "string.email": "O campo email deve ser um email válido.",
        "array.unique": "O campo email não pode ser duplicado",
    }),

    senha: joi.string().min(3).required().messages({
        "any.required": "O campo senha é obrigatório.",
        "string.empty": "O campo senha não pode estar vazio.",
        "string.min": "O campo senha deve ter, no mínimo, 3 caracteres.",
    }),
})

module.exports = usuarioSchema
