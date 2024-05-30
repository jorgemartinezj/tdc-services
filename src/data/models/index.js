const Sequelize = require('sequelize');

const dbConfig = require('../config');

const Productos = require('./productos.js');
const Plazos = require('./plazos.js');

const sequelize = process.env.NODE_ENV !== 'test'
  ? new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      logging: process.env.NODE_ENV === 'development',
      dialectOptions: {
        ssl:{
          require:true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const ProductosModel = Productos(sequelize, Sequelize);
const PlazosModel = Plazos(sequelize, Sequelize);

db.productos = ProductosModel;
db.plazos = PlazosModel;

module.exports = db;
