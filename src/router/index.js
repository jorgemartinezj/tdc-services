const express = require('express');

// rutas
const productos = require('./productos');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    mensaje: 'Bienvenido.'
  })
});

router.use('/productos', productos);

module.exports = router;
