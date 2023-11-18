const gerarUrl = (email, id, imagem) => {
  return `https://${process.env.BACKBLAZE_BUCKET}.${
    process.env.ENDPOINT_S3
  }/pdv/${encodeURIComponent(email)}/${id}/${encodeURIComponent(
    imagem.originalname
  )}`;
};

module.exports = { gerarUrl };
