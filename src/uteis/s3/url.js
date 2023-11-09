const gerarUrl = (imagem) => {
  return `https://${process.env.BACKBLAZE_BUCKET}.${
    process.env.ENDPOINT_S3
  }/pdv/${encodeURIComponent(imagem.originalname)}`;
};

module.exports = { gerarUrl };
