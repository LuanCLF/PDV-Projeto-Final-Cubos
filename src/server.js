require("dotenv").config();
const express = require("express");
const rotas = require("./rotas/rotas");
const { errorHandler } = require("./intermediarios");

const app = express();

app.use(express.json());

app.use(rotas);
app.use(errorHandler);

module.exports = app;
