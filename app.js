const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./src/router');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Bienvenido.'
  });
});

app.use('/api/v1', router);

module.exports = app;
