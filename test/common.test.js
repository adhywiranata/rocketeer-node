const request = require('supertest');
const expect = require('chai').expect;

const server = request(process.env.SERVICE_ENDPOINT);

describe('GET /basic', function () {
  it('respond correctly', function (done) {
    server
      .get('/basic')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /protected', function () {
  it('respond correctly', function (done) {
    server
      .get('/protected')
      .set('Accept', 'application/json')
      .set('Api-App-Key', 'dont-use-hard-coded-value-like-me')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('respond unauthorized for missing key', function (done) {
    server
      .get('/protected')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});

describe('GET /protected-mod', function () {
  it('respond correctly', function (done) {
    server
      .get('/protected-mod')
      .set('Accept', 'application/json')
      .set('Token', 'dont-use-hard-coded-value-like-me')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('respond unauthorized for missing key', function (done) {
    server
      .get('/protected-mod')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});

describe('GET non-existent route', function () {
  it('respond forbidden correctly', function (done) {
    server
      .get('/nothing-here')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403, done);
  });
});