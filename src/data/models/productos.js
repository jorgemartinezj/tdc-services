module.exports = (sequelize, Sequelize) => {
  const Productos = sequelize.define('productos', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sku: {
      type: Sequelize.STRING,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
    precio: {
      type: Sequelize.DECIMAL,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }, {
    freezeTableName: true,
  });

  return Productos;
};
