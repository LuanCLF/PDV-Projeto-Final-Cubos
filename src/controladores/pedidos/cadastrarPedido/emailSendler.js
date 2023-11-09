const nodemailer = require("nodemailer");

const transportador = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const envioDeEmail = async (nome, email) => {
  await transportador.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `${nome} <${email}>`,
    subject: `Compra efetuada com sucesso!`,
    text: `Parabéns ${nome}, Sua compra foi efetuada com sucesso!`,
  });
};

module.exports = envioDeEmail;
