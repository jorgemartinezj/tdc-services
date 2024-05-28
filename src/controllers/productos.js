/**
 * obtener el listado de todos los productos.
 * 
 * @param {object} req 
 * @param {object} res 
 */
const obtenerTodos = (req, res) => {
  res.status(200).send({
    data: [

    ],
  });
};

module.exports = {
  obtenerTodos,
}
