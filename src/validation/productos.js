const { body, param } = require('express-validator');

// validar el payload para agregar un producto.
const agregarProducto = [
  body('sku')
    .exists()
    .withMessage('Se espera el SKU.')
    .isLength({ min: 4, max: 10 })
    .withMessage('El SKU debe de tener al menos 4 y no más de 10 caracteres.'),
  body('nombre')
    .exists()
    .withMessage('Se espera el nombre.')
    .isLength({ min: 4, max: 50 })
    .withMessage('El nombre debe de tener al menos 4 y no más de 50 caracteres.'),
  body('descripcion')
    .optional()
    .isLength({ min: 10, max: 100 })
    .withMessage('La descripción debe de tener al menos 10 y no más de 100 caracteres.'),
  body('precio')
    .exists()
    .withMessage('Se espera el precio.')
    .isNumeric()
    .withMessage('El precio debe de ser númerico.'),
];

// validar la solicitud para el borrado de un producto por id.
const borrarProducto = [
  param('id')
    .exists()
    .withMessage('Se espera el parámetro id del producto.')
    .isInt()
    .withMessage('El id debe de ser númerico.'),
];

// validar el payload para actualizar un producto por su id.
const actualizarProducto = [
  param('id')
    .exists()
    .withMessage('Se espera el parámetro id del producto.')
    .isInt()
    .withMessage('El id debe de ser númerico.'),
  body('nombre')
    .optional()
    .isLength({ min: 4, max: 50 })
    .withMessage('El nombre debe de tener al menos 4 y no más de 50 caracteres.'),
  body('descripcion')
    .optional()
    .isLength({ min: 10, max: 100 })
    .withMessage('La descripción debe de tener al menos 10 y no más de 100 caracteres.'),
  body('precio')
    .optional()
    .isNumeric()
    .withMessage('El precio debe de ser númerico.'),
];

module.exports = {
  agregarProducto,
  borrarProducto,
  actualizarProducto,
};
