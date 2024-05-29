const app = require('./app');

const db = require('./src/data/models');

db.sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada.');
  })
  .catch((err) => {
    console.log(`Fallo la sincronizacion de la base de datos: ${err.message}.`);
  });

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`Servicio en linea sobre el puerto ${PUERTO}`);
});
