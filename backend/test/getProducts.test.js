import { expect } from 'chai';
import supertest from 'supertest';
import { describe, it } from 'mocha';
import { request } from 'express';
import '../app.js'

chai.use(chaiHttp);

describe('API Endpoints', () => {
    it('should return a list with every product available for GET /products', async () => {
        const res = await request(app).get('/prducts');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').eql('ok');
    });
});