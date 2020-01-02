const knex = require('knex');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Users Endpoints', function(){
    let db; 

    const {testUsers}= helpers.makeUsersArray();
    const testUser = testUsers[0];

    before('make knex instance', ()=> {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        });
        app.set('db', db);
    });
    after('disconnect from db', ()=> db.destroy());
    
    before('clean tables', ()=> helpers.cleanTables(db));

    afterEach('clean tables', () => helpers.cleanTables(db));

    describe (`POST/api/users`, ()=> {
        context(`User Validation`, ()=> {
            beforeEach('insert users', ()=> helpers.seedUsers(db, testUsers));

            const requiredFields = [
                'first_name',
                'last_name',
                'user_name',
                'user_email',
                'password'
            ];
            requiredFields.forEach(field => {
                const registerAttemptBody = {
                    first_name: 'test first_name',
                    last_name: 'test last_name',
                    user_name: 'test user_name',
                    user_email: 'test user_email',
                    password: 'test password'
                };
                it(`responds 400 'Password must be longer than 8 characters' when empty password`, ()=> {
                    const userShortPassword = {
                        first_name: 'test first_name',
                        last_name: 'test last_name',
                        user_name: 'test user_name',
                        user_email: 'useremail@aol.com',
                        password: 'abcdefg'
                    };
                    return supertest(app)
                        .post('/api/users')
                        .send(userShortPassword)
                        .expect(400, {error: `Password must be longer than 8 characters`});
                });
                
            })
        });

    })
})