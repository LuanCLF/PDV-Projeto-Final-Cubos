const path = require("path");

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
      client: "sqlite3",
      connection: ":memory:",
      pool: {
        afterCreate: (connection, done) => {
          connection.run("PRAGMA foreign_keys = ON"), done();
        },
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
