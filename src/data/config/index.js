require('dotenv').config();

module.exports = {
  HOST: process.env.HOST_DB,
  USER: process.env.USER_DB,
  PASSWORD: process.env.PASSWORD_DB,
  DB: process.env.DATABASE,
  dialect: 'postgres',
};
