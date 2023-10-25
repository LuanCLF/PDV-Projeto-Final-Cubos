const path = require("path");
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

    const prod = {
        ...dev,
    };
    switch (process.env.NODE_ENV) {
        case "prod":
            return prod;

        default:
            return dev;
    }
};

const configuracaoKnex = pegarEnviroment();

module.exports = configuracaoKnex;
