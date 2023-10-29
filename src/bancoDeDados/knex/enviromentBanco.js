const path = require("path");
const { parse } = require("pg-connection-string");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const pegarEnviroment = () => {
  const dev = {
    client: "pg",
    useNullAsDefault: true,
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: path.resolve(__dirname, "..", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "..", "seeds"),
    },
  };

  let test;
  if (process.env.NODE_ENV === "test") {
    test = {
      ...dev,
      connection: {
        ...parse(process.env.VERCEL_DB_TEST),
        ssl: { rejectUnauthorized: false },
      },
    };
  }

  const prod = {
    ...dev,
  };
  switch (process.env.NODE_ENV) {
    case "prod":
      return prod;
    case "test":
      return test;
    default:
      return dev;
  }
};

const configuracaoKnex = pegarEnviroment();

module.exports = configuracaoKnex;
