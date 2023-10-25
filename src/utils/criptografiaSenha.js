const saltOrRounds = 10
const bcrypt = require('bcrypt')

const criptografarSenha = async (senha) => {

    const senhaCriptografada = await bcrypt.hash(senha, saltOrRounds)

    return senhaCriptografada
}


module.exports = criptografarSenha