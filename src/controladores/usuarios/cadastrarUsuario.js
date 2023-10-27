const { StatusCodes} = require("http-status-codes");
const { ConflictRequestError } = require('../../helpers/api-errors-helpers')

const {
  emailExistente,
  usuarioCadastrado,
} = require("../../bancoDeDados/usuarioQuerys/queryFuncoes");
const criptografarSenha = require("../../utils/criptografiaSenha");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    
    const EmailCadastrado = await emailExistente(email);

    if (EmailCadastrado.length > 0) {
      //throw ConflictRequestError({message: "O Email já está cadastrado!"});
      res.status(409).json({mensagem: "Email ja está cadastrado!"});
    }

    const senhaCriptografada = await criptografarSenha(senha);

    await usuarioCadastrado(nome, email, senhaCriptografada);
    res.status(StatusCodes.CREATED).send()  //   res.status(201).json();

};

module.exports = cadastrarUsuario;
