const express = require('express');

const productos = require('../controllers/productos');

const router = express.Router();

// rutas
router.get('/', productos.obtenerTodos);
router.post('/', productos.agregarProducto);

module.exports = router;
