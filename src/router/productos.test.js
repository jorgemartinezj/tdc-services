const supertest = require('supertest');

const db = require('../data/models');
const app = require('../../app');

const request = supertest(app);

describe('Testear los validadores de los endpoints de productos.', () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
  });

  // OK

  test('Debería de devolver un código 200 si el payload va correcto.', (done) => {
    request.post('/api/v1/productos')
      .send({
        sku: '123456789',
        nombre: 'Excepteur exercitation exercitation',
        descripcion: 'Exercitation culpa nostrud veniam ex cillum mollit do',
        precio: '10.2',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201)
      .then((response) => {
        expect(response.status).toBe(201);

        done();
      });
  });

  test('Debería de devolver un 200 si la descripción no se envía por que es opcional.', (done) => {
    request.post('/api/v1/productos')
      .send({
        sku: '12345678',
        nombre: 'Excepteur exercitation exercitation',
        precio: '10.2',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201)
      .then((response) => {
        expect(response.status).toBe(201);

        done();
      });
  });

  // ERROR sku

  test('Debería de devolver un 400 si el sku no se envía.', (done) => {
    request.post('/api/v1/productos')
      .send({
        nombre: 'Excepteur exercitation exercitation',
        descripcion: 'Exercitation culpa nostrud veniam ex cillum mollit do',
        precio: '10.2',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un 400 si el SKU es menor a 4 caracteres.', (done) => {
    request.post('/api/v1/productos')
      .send({
        sku: '123',
        nombre: 'Excepteur exercitation exercitation',
        descripcion: 'Exercitation culpa nostrud veniam ex cillum mollit do',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un 400 si el SKU es mayor a 10 caracteres.', (done) => {
    request.post('/api/v1/productos')
      .send({
        sku: '12345678901',
        nombre: 'Excepteur exercitation exercitation',
        descripcion: 'Exercitation culpa nostrud veniam ex cillum mollit do',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un 400 si el SKU se intenta insertar por segunda vez.', (done) => {
    const producto = {
      sku: '123456789',
      nombre: 'Excepteur exercitation exercitation',
      descripcion: 'Exercitation culpa nostrud veniam ex cillum mollit do',
      precio: '10.2',
    };

    const Productos = db.productos;

    Productos.sync().then(async () => {
      await Productos.create(producto); // inserta directamente un producto a la base de datos

      request.post('/api/v1/productos')
        .send(producto)
        .expect(400)
        .then((response) => {
          expect(response.body).toHaveProperty('mensaje');
          expect(response.body).toMatchObject({ mensaje: 'SKU no disponible.' });

          expect(response.status).toBe(400);

          done();
        });
    });
  });

  // ERROR nombre

  test('Debería de devolver un 400 si el nombre no se envía.', (done) => {
    request.post('/api/v1/productos')
      .send({
        sku: '123456789',
        descripcion: 'Exercitation culpa nostrud veniam ex cillum mollit do',
        precio: '10.2',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un 400 si el nombre es menor a 4 caracteres.', (done) => {
    request.post('/api/v1/productos')
      .send({
        sku: '123456789',
        nombre: 'Exc',
        descripcion: 'Exercitation culpa nostrud veniam ex cillum mollit do',
        precio: '10.2',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un 400 si el nombre es mayor a 50 caracteres.', (done) => {
    request.post('/api/v1/productos')
      .send({
        sku: '123456789',
        nombre: 'Excepteur exercitation exercitation sit commodo exe',
        descripcion: 'Exercitation culpa nostrud veniam ex cillum mollit do',
        precio: '10.2',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  // ERROR precio

  test('Debería de devolver un 400 si el precio no se envía.', (done) => {
    request.post('/api/v1/productos')
      .send({
        sku: '123456789',
        nombre: 'Excepteur exercitation exercitation',
        descripcion: 'Exercitation culpa nostrud veniam ex cillum mollit do',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

  test('Debería de devolver un 400 si el precio se envía una cadena alfanumérica.', (done) => {
    request.post('/api/v1/productos')
      .send({
        sku: '123456789',
        nombre: 'Excepteur exercitation exercitation',
        descripcion: 'Exercitation culpa nostrud veniam ex cillum mollit do',
        precio: '1a9',
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
      .then((response) => {
        expect(response.status).toBe(400);

        done();
      });
  });

});
