require("express-async-errors");
require("dotenv").config();
var cors = require('cors')
const express = require("express");
const rotas = require("./rotas/rotas");
const { intermediarioDeErros } = require("./intermediarios");

const app = express();
app.use(cors())
app.use(express.json());
app.use(rotas);
app.use(intermediarioDeErros);

module.exports = app;
