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

  // buscar un producto con el sku
  const producto = await Productos.findOne({ where: { sku: sku }});

  if (producto !== null) { // existe un producto con el mismo sku
    return res.status(400).send({
      mensaje: 'SKU no disponible.',
      producto: producto
    });
  }

  // grabar en la base de datos
  Productos.create({
    sku,
    nombre,
    descripcion,
    precio,
  });

  res.status(201).send({});
}; // agregarProducto

/**
 * Eliminar producto por id.
 *
 * @param {object} req
 * @param {object} res
 */
const eliminarProducto = async(req, res) => {
  const { id } = req.params;

  Productos.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).send({});
}; // eliminarProducto

/**
 * Actualizar la información de un producto por su id.
 *
 * @param {object} req
 * @param {object} res
 */
const actualizarProducto = async(req, res) => {
  const { id } = req.params;
  const { sku, nombre, precio, descripcion } = req.body;

  // obtener el producto por el id
  const producto = await Productos.findByPk(id);

  // actualizar los datos
  producto.sku = sku;
  producto.nombre = nombre;
  producto.precio = precio;
  producto.descripcion = descripcion;

  // grabar registro
  await producto.save();

  res.status(200).send({
    data: producto,
  });
}; // actualizarProducto

module.exports = {
  obtenerTodos,
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
}
