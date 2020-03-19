const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers')

describe('Protected Endpoints', function() {
  let db;

  const { 
    testUsers,
    testWorkouts
  } = helpers.makeTableFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());
  before('cleanup', () => db.raw('TRUNCATE users,workouts RESTART IDENTITY CASCADE'));
  afterEach('cleanup', () => db.raw('TRUNCATE users,workouts RESTART IDENTITY CASCADE'));
  beforeEach('insert data to tables', () => 
    helpers.seedTables (
      db,
      testUsers,
      testWorkouts
    )
  );

  const protectedEndpoints = [
    {
      name: 'GET /api/users',
      path: '/api/users',
      method: 'supertest(app).get',
    },
    {
      name: 'GET /api/fitpadData',
      path: '/api/fitpadData',
      method: 'supertest(app).get'
    }
  ]

  protectedEndpoints.forEach(endpoint => {
    describe(endpoint.name, () => {
      it('responds 401 \'Missing basic token\' when no basic token', () => {
        return endpoint.method(endpoint.path)
        .expect(401, { error: 'Missing bearer token'});
      });
      it('responds 401 \'Unathorized request\' when no credentials in token', () => {
        const userNoCreds = { email: '', password: ''};
        return endpoint.method(endpoint.path)
        .set('Authorization', helpers.makeAuthHeader(userNoCreds))
        .expect(401, { error: 'Unathorized Request'});
      });
      it('responds 200 \'OK\' when valid credentials', () => {
        const userValidCreds = {email: testUser[0].email, password: testUser[0].password};
        return endpoint.method(endpoint.path)
        .set('Authorization', helpers.makeAuthHeader(userValidCreds))
        .expect(200);
      })
    })
  })
})