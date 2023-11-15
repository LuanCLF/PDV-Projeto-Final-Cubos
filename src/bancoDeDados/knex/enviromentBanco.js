const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const pegarEnviroment = () => {
  const dev = {
    useNullAsDefault: true,
    client: "sqlite3",
    connection: path.resolve(__dirname + "../../../../bancoSqlLite.db"),
    pool: {
      afterCreate: (connection, done) => {
        connection.run("PRAGMA foreign_keys = ON"), done();
      },
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
