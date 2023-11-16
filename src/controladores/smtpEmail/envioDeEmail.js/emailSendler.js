const transportador = require("../conexaoTransportador/transportador");
const envioDeEmail = async (nome, email) => {
  await transportador.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `${nome} <${email}>`,
    subject: `Compra efetuada com sucesso!`,
    text: `Parabéns ${nome}, Sua compra foi efetuada com sucesso!`,
  });
};

module.exports = envioDeEmail;
