const Sequelize = require('sequelize');

const dbConfig = require('../config');

const Productos = require('./productos.js');
const Plazos = require('./plazos.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const ProductosModel = Productos(sequelize, Sequelize);
const PlazosModel = Plazos(sequelize, Sequelize);

db.productos = ProductosModel;
db.plazos = PlazosModel;

module.exports = db;
