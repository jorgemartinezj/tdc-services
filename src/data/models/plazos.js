module.exports = (sequelize, Sequelize) => {
  const Plazos = sequelize.define('plazos', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    num_semanas: {
      type: Sequelize.INTEGER,
    },
    tasa_normal: {
      type: Sequelize.DECIMAL,
    },
    tasa_puntual: {
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

  return Plazos;
};
