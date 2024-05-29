const express = require('express');

const productos = require('../controllers/productos');
const { validar } = require('../validation/validador');
const { productos: productosValidador } = require('../validation');

const router = express.Router();

// rutas
router.get('/', productos.obtenerTodos);
router.post('/', validar(productosValidador.agregarProducto), productos.agregarProducto);
router.delete('/:id', validar(productosValidador.borrarProducto), productos.eliminarProducto);
router.put('/:id', validar(productosValidador.actualizarProducto), productos.actualizarProducto);

module.exports = router;
