const supertest = require('supertest');

const app = require('./app');
const request = supertest(app)

describe('Testear el inicio del servicio.', () => {
  test('Debería de responder al método GET', (done) => {
    request.get('/')
      .expect(200)
      .then((response) => {
        expect(response.status).toBe(200);

        done();
      });
  });

  test('No debería de responser a una ruta que no existe.', (done) => {
    request.get('/alguna-ruta-no-existente')
      .expect(404)
      .then((response) => {
        expect(response.status).toBe(404);

        done();
      });
  });
});
