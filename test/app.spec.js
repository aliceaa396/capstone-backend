
const app = require('../src/app');

describe('App', ()=> {
  it('GET / responds with 200', ()=>{
    return supertest(app)
      .get('/workouts')
      .expect('Content-Type', /json/)
      .expect(200)
  })
})