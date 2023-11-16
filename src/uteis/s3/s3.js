const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  endpoint: "https://" + process.env.ENDPOINT_S3,
  region: "BACKBLAZE",
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.KEY_APPLICATION,
  },
});

module.exports = { s3 };
