const { body, param } = require('express-validator');

// validar el payload para agregar un plazo.
const agregarPlazo = [
  body('numero_semanas')
    .exists()
    .withMessage('Se espera numero_semanas.')
    .isInt({ min: 1, max: 48 })
    .withMessage('El parametro numero_semanas debe de ser mayor igual 1 y menor igual a 48.'),
  body('tasa_normal')
    .exists()
    .withMessage('Se espera tasa_normal.')
    .isFloat({ min: 0, max: 100 })
    .withMessage('El parametro tasa_normal debe de ser mayor igual a 0 y menor igual a 100.'),
  body('tasa_puntual')
    .exists()
    .withMessage('Se espera tasa_puntual')
    .isFloat({ min: 0, max: 100 })
    .withMessage('El parametro tasa_normal debe de ser mayor igual a 0 y menor igual a 100.'),
];

// validar la solicitud para el borrado de un plazo por id.
const eliminarPlazo = [
  param('id')
    .exists()
    .withMessage('Se espera el parámetro id de la tasa.')
    .isInt()
    .withMessage('El id debe de ser númerico.'),
];

// validar el payload para actualizar un plazo por su id.
const actualizarPlazo = [
  param('id')
    .exists()
    .withMessage('Se espera el parámetro id del plazo.')
    .isInt()
    .withMessage('El id debe de ser númerico.'),
  body('numero_semanas')
    .optional()
    .isInt({ min: 1, max: 48 })
    .withMessage('El parametro numero_semanas debe de ser mayor igual 1 y menor igual a 48.'),
  body('tasa_normal')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('El parametro tasa_normal debe de ser mayor igual a 0 y menor igual a 100.'),
  body('tasa_puntual')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('El parametro tasa_normal debe de ser mayor igual a 0 y menor igual a 100.'),
];

module.exports = {
  agregarPlazo,
  eliminarPlazo,
  actualizarPlazo,
};
