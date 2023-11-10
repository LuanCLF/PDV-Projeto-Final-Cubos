require("express-async-errors");
require("dotenv").config();

const express = require("express");
const rotas = require("./rotas/rotas");
const { intermediarioDeErros } = require("./intermediarios");

const app = express();

app.use(express.json());

app.use(rotas);
app.use(intermediarioDeErros);

module.exports = app;
