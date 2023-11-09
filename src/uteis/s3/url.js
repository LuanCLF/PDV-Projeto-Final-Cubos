const gerarUrl = (email, imagem) => {
  return `https://${process.env.BACKBLAZE_BUCKET}.${
    process.env.ENDPOINT_S3
  }/pdv/${encodeURIComponent(email)}/${encodeURIComponent(
    imagem.originalname
  )}`;
};

module.exports = { gerarUrl };
