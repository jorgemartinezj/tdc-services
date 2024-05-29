const db = require('../data/models');

const Productos = db.productos;

/**
 * obtener el listado de todos los productos.
 *
 * @param {object} req
 * @param {object} res
 */
const obtenerTodos = async(req, res) => {
  // obtener todos los productos
  const productos = await Productos.findAll();

  res.status(200).send({
    data: productos,
  });
}; // obtenerTodos

/**
 * agregar un producto
 *
 * @param {object} req
 * @param {object} res
 */
const agregarProducto = async(req, res) => {
  const { sku, nombre, precio, descripcion } = req.body;

  // grabar en la base de datos
  Productos.create({
    sku,
    nombre,
    descripcion,
    precio,
  });

  res.status(201).send({});
}; // agregarProducto

module.exports = {
  obtenerTodos,
  agregarProducto,
}
