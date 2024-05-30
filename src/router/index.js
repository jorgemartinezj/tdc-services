const express = require('express');

// rutas
const productos = require('./productos');
const plazos = require('./plazos');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    mensaje: 'Bienvenido.'
  })
});

router.use('/productos', productos);
router.use('/plazos', plazos);

module.exports = router;
