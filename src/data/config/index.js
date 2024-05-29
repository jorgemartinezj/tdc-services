module.exports = {
  HOST: process.env.HOST_DB || 'localhost',
  USER: process.env.USER_DB || 'postgres',
  PASSWORD: process.env.PASSWORD_DB || 'toor',
  DB: process.env.DATABASE || 'tdc',
  dialect: 'postgres',
};
