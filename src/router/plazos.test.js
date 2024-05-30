const supertest = require('supertest');

const db = require('../data/models');
const app = require('../../app');

const request = supertest(app);
const Plazos = db.plazos;

describe('Testear los validadores de los endpoints de los plazos.', () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
  });

  // OK

  test('Debería de devolver un código 200 si el payload va correcto.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        numero_semanas: '1',
        tasa_normal: '0.8963',
        tasa_puntual: '1.0366',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201)
      .then((response) => {
        expect(response.status).toBe(201);

        done();
      });
  });

  // ERROR numero_semanas

  test('Debería de devolver un código 400 si se intenta grabar una semana que existe en la base de datos.', (done) => {
    const plazo = {
      numero_semanas: '1',
      tasa_normal: '0.8963',
      tasa_puntual: '1.0366',
    };

    Plazos.sync().then(async () => {
      await Plazos.create(plazo); // insertar directamente en la base de datos

      request.post('/api/v1/plazos')
      .send(plazo)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({ mensaje: 'Número de semanas no disponible.' });
        expect(response.body).toHaveProperty('mensaje');

        done();
      });
    });
  });

  test('Debería de devolver un código 400 si se envía numero_semanas menor a 1.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        numero_semanas: '0',
        tasa_normal: '0.8963',
        tasa_puntual: '1.0366',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un código 400 si se envía numero_semanas mayor a 48.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        numero_semanas: '49',
        tasa_normal: '0.8963',
        tasa_puntual: '1.0366',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un código 400 si se envía numero_semanas como cadena alfanumérica.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        numero_semanas: '2 semanas',
        tasa_normal: '0.8963',
        tasa_puntual: '1.0366',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un código 400 si el numero_semanas no se envía.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        tasa_normal: '0.8963',
        tasa_puntual: '1.0366',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  // ERROR tasa_normal

  test('Debería de devolver un código 400 si tasa_normal no se envía.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        numero_semanas: '1',
        tasa_puntual: '1.0366',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un código 400 si tasa_normal se envía como cadena alfanumérica.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        numero_semanas: '1',
        tasa_normal: '0.8963 tasa',
        tasa_puntual: '1.0366',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un código 400 si tasa_normal se envía menor a 0.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        numero_semanas: '1',
        tasa_normal: '-0.1',
        tasa_puntual: '1.0366',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un código 400 si tasa_normal se envía mayor a 100.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        numero_semanas: '1',
        tasa_normal: '100.01',
        tasa_puntual: '1.0366',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  // ERROR tasa_puntual

  test('Debería de devolver un código 400 si tasa_puntual no se envía.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        numero_semanas: '1',
        tasa_normal: '0.8963',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un código 400 si tasa_puntual se envía como cadena alfanumérica.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        numero_semanas: '1',
        tasa_normal: '0.8963',
        tasa_puntual: '1.0366 tasa',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un código 400 si tasa_puntual se envía menor a 0.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        numero_semanas: '1',
        tasa_normal: '0.8963',
        tasa_puntual: '-0.1',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un código 400 si tasa_puntual se envía mayor a 100.', (done) => {
    request.post('/api/v1/plazos')
      .send({
        numero_semanas: '1',
        tasa_normal: '0.8963',
        tasa_puntual: '100.01',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

});
