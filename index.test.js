const request = require('supertest');

const app = require('./app');

describe('Testear el inicio del servicio', () => {
  const server = app.listen(process.env.PORT || 3001, () => {});

  test('Debería de responder al método GET', (done) => {
    request(app).get('/')
      .then((response) => {
        expect(response.status).toBe(200);

        done();
      });
  });

  afterAll(done => {
    server.close();
    done();
  });
});
