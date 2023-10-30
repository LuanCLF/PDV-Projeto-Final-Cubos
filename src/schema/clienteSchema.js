const joi = require("joi")

const clienteSchema = {
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório.",
        "string.empty": "O campo nome não pode estar vazio.",
        "string.base": "O campo nome deve ser um texto.",
    }),

    email: joi.string().email().required().messages({
        "any.required": "O campo email é obrigatório.",
        "string.empty": "O campo email não pode estar vazio.",
        "string.email": "O campo email deve ser um email válido.",
        "string.base": "O campo email deve ser um texto.",
    }),

    cpf: joi.string().length(11).required().messages({
        "any.required": "O campo cpf é obrigatório.",
        "string.empty": "O campo cpf não pode estar vazio.",
        "string.length": "O campo cpf deve ter 11 caracteres.",
        "string.base": "O campo cpf deve ser um texto.",
    }),

    cep: joi.string().length(8).messages({
        "string.empty": "O campo cep não pode estar vazio.",
        "string.length": "O campo cep deve ter 8 caracteres.",
        "string.base": "O campo cep deve ser um texto.",
    }),

    rua: joi.string().messages({
        "string.empty": "O campo rua não pode estar vazio.",
        "string.base": "O campo rua deve ser um texto.",
    }),

    numero: joi.string().messages({
        "string.empty": "O campo numero não pode estar vazio.",
        "string.base": "O campo numero deve ser um texto.",
    }),

    bairro: joi.string().messages({
        "string.empty": "O campo bairro não pode estar vazio.",
        "string.base": "O campo bairro deve ser um texto.",
    }),

    cidade: joi.string().messages({
        "string.empty": "O campo cidade não pode estar vazio.",
        "string.base": "O campo cidade deve ser um texto.",
    }),

    estado: joi.string().length(2).messages({
        "string.empty": "O campo estado não pode estar vazio.",
        "string.base": "O campo estado deve ser um texto.",
        "string.length": "O campo estado deve ter 2 caracteres.",
    }),
}

const cadastro = joi.object(clienteSchema)
const editar = joi.object(clienteSchema)

module.exports = {
    cadastro,
    editar,
}
