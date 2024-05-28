const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const puerto = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Bienvenido.'
  });
});

app.listen(puerto, () => {
  console.log(`Servicio en linea sobre el puerto ${puerto}`);
});
