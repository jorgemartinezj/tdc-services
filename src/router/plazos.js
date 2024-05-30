const express = require('express');

const plazos = require('../controllers/plazos');
const { validar } = require('../validation/validador');
const { plazos: plazosValidador } = require('../validation');

const router = express.Router();

// rutas
router.get('/', plazos.obtenerTodos);
router.post('/', validar(plazosValidador.agregarPlazo), plazos.agregarPlazos);
router.delete('/:id', validar(plazosValidador.eliminarPlazo), plazos.eliminarPlazos);
router.put('/:id', validar(plazosValidador.actualizarPlazo), plazos.actualizarPlazos);

module.exports = router;
