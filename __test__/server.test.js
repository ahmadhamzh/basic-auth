'use strict'

const { app } = require('../src/server');
const { db } = require('../src/models/index');
const supertest = require('supertest');

const mockRequest = supertest(app);

beforeAll(async () => {
    await db.sync()
});

afterAll(async () => {
    await db.drop()
});

describe('server testing', () => {

    test('check for signup', async () => {
        const respons = await mockRequest.post('/signup').send({
            username: "john",
            password: "foo"
        });
        expect(respons.status).toBe(200)
        
    });
    
   
    test('check for signin', async () => {
        const respons = await mockRequest.post('/signin').auth('admin', 'admin');
        expect(respons.status).toBe(403)

    });
    test('check for signin & signup', async () => {
        const user = await mockRequest.post('/signup').send({
            username: "admin",
            password: "admin"
        });
        const respons = await mockRequest.post('/signin').send({
            username: "admin",
            password: "admin"
        }).auth(user.body.username,'admin')
        expect(respons.status).toBe(200)

    });



})

