const { BadRequestError } = require("./api-errors-helpers");

const fieldValidator = (arr, body) => {
  for (const required of arr) {
    if (!body.hasOwnProperty(required)) {
      throw BadRequestError(`O campo ${required} é obrigatório`);
    }
  }
};

module.exports = fieldValidator;
