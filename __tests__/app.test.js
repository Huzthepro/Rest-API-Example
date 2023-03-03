import request from 'supertest';
import supertest from 'supertest';
import app from '../index.js';

describe('Testing /movie', () => {
  //  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  POST  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
  describe('Testing Post', () => {
    //Post Happy Path
    test('-Post- Happy Path: should respond with a 200 status code', async () => {
      const response = await request(app).post('/movie').send({
        title: 'title',
        director: 'director',
        release_date: '12',
      });
      expect(response.statusCode).toBe(200);
    });

    //Post Happy path: response should be Json
    test('-Post- Happy Path: response should be Json', async () => {
      const response = await request(app).post('/movie').send({
        title: 'title',
        director: 'director',
        release_date: '12',
      });
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json'),
      );
    });

    //Post missing information
    test('-Post-  If data is missing respond should be: 404 status code', async () => {
      const response = await request(app).post('/movie').send({
        title: 'title',
        release_date: '12',
      });
      expect(response.statusCode).toBe(400);
    });

    //Post Same title error
    test('-Post- If there is a data with same title it should return 400', async () => {
      const response = await request(app).post('/movie').send({
        title: 'title',
        director: 'director',
        release_date: '12',
      });
      const response2 = await request(app).post('/movie').send({
        title: 'title',
        director: 'director',
        release_date: '12',
      });
      expect(response2.statusCode).toBe(400);
    });
  });

  //  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Delete  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
  describe('Testing Delete', () => {
    //-Delete- Happy Path
    test('-Delete- Happy Path: Deleted movie (id:1) should respond with a 200 status code', async () => {
      const response = await request(app).delete('/movie/1');
      expect(response.statusCode).toBe(200);
    });
    //-Delete- Wrong id
    test('-Delete- Wrong id: random id(aasdasd) should respond with a 404 status code', async () => {
      const response = await request(app).delete('/movie/aasdasd');
      expect(response.statusCode).toBe(404);
    });
    //-Delete- Deleted movie should removed
    test('-Delete- Deleted movie (id:1) should removed', async () => {
      const response2 = await request(app).get('/movie/1');
      expect(response2.statusCode).toBe(404);
    });
  });

  //  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Get  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
  describe('Testing Get', () => {
    //-Get- Happy Path
    test('-Get- endpoint with id:2 should return data and 200 status code', async () => {
      const response = await request(app).get('/movie/2');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        msg: 'Movie EXIST successfully',
        movie: {
          title: 'The Irishman',
          director: 'Martin Scorsese',
          release_date: '2019-09-27',
          id: '2',
        },
      });
    });
  });
});
