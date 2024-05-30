const { validationResult } = require('express-validator');

/**
 * middleware para validar un arreglo de condiciones.
 *
 * @param {ValidationChain []} schemas
 * @returns
 */
const validar = (schemas) => {
  return async (req, res, next) => {
    await Promise.all(schemas.map((schema) => schema.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    const errors = result.array();

    return res.status(400).send({
      message: 'Error en la validación',
      errors: errors,
    });
  };
}

module.exports = {
  validar,
};
