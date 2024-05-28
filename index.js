const app = require('./app');

const PUERTO = 3000;

app.listen(PUERTO, () => {
  console.log(`Servicio en linea sobre el puerto ${PUERTO}`);
});
