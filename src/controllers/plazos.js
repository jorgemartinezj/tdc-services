const db = require('../data/models');

const Plazos = db.plazos;

/**
 * obtener el listado de todas los plazos.
 *
 * @param {object} req
 * @param {object} res
 */
const obtenerTodos = async(req, res) => {
  // obtener todas los plazos
  const plazos = await Plazos.findAll();

  res.status(200).send({
    data: plazos,
  });
}; // obtenerTodos

/**
 * agregar una tasa
 *
 * @param {object} req
 * @param {object} res
 */
const agregarPlazos = async(req, res) => {
  const { numero_semanas, tasa_normal, tasa_puntual } = req.body;

  // buscar una tasa por el numero de semanas
  const tasa = await Plazos.findOne({ where: { numero_semanas: numero_semanas }});

  if (tasa !== null) { // existe una tasa con el mismo numero de semanas
    return res.status(400).send({
      mensaje: 'Número de semanas no disponible.',
      tasa: tasa,
    });
  }

  // grabar en la base de datos
  Plazos.create({
    numero_semanas,
    tasa_normal,
    tasa_puntual,
  });

  res.status(201).send({});
}; // agregarPlazos

/**
 * Eliminar tasa por id.
 *
 * @param {object} req
 * @param {object} res
 */
const eliminarPlazos = async(req, res) => {
  const { id } = req.params;

  Plazos.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).send({});
}; // eliminarPlazos

/**
 * Actualizar la información de una tasa por su id.
 *
 * @param {object} req
 * @param {object} res
 */
const actualizarPlazos = async(req, res) => {
  const { id } = req.params;
  const { tasa_normal, tasa_puntual } = req.body;

  // obtener la tasa por el id
  const tasa = await Plazos.findByPk(id);

  // actualizar los datos
  tasa.tasa_normal = tasa_normal;
  tasa.tasa_puntual = tasa_puntual;

  // grabar registro
  await tasa.save();

  res.status(200).send({
    data: tasa,
  });
}; // actualizarPlazos

module.exports = {
  obtenerTodos,
  agregarPlazos,
  eliminarPlazos,
  actualizarPlazos,
}
