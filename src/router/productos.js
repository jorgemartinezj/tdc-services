const express = require('express');

const productos = require('../controllers/productos');

const router = express.Router();

// rutas
router.get('/', productos.obtenerTodos);

module.exports = router;
