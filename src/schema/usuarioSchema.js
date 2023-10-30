const joi = require("joi")

const usuarioSchema = {
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório.",
        "string.empty": "O campo nome não pode estar vazio.",
    }),

    email: joi.string().email().required().messages({
        "any.required": "O campo email é obrigatório.",
        "string.empty": "O campo email não pode estar vazio.",
        "string.email": "O campo email deve ser um email válido.",
    }),

    senha: joi.string().min(3).required().messages({
        "any.required": "O campo senha é obrigatório.",
        "string.empty": "O campo senha não pode estar vazio.",
        "string.min": "O campo senha deve ter, no mínimo, 3 caracteres.",
    }),
}

const cadastro = joi.object(usuarioSchema)
const editar = joi.object(usuarioSchema)

const { nome, ...schemaLogin } = usuarioSchema
const login = joi.object(schemaLogin)

module.exports = { cadastro, editar, login }
