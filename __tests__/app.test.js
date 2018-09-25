import request from 'supertest';
import matchers from 'jest-supertest-matchers';

import solution from '../app';

describe('requests', () => {
  beforeAll(() => {
    jasmine.addMatchers(matchers);
  });

  it('GET /', async () => {
    const res = await request(solution()).get('/');
    expect(res).toHaveHTTPStatus(200);
  });

  it('GET /posts', async () => {
    const res = await request(solution()).get('/posts');
    expect(res).toHaveHTTPStatus(200);
  });

  it('GET /posts/new', async () => {
    const res = await request(solution())
      .get('/posts/new');
    expect(res).toHaveHTTPStatus(200);
  });

  it('POST /posts', async () => {
    const res = await request(solution())
      .post('/posts')
      .type('form')
      .send({ title: 'post title', body: 'post body' });
    expect(res).toHaveHTTPStatus(302);
  });

  it('POST /posts (errors)', async () => {
    const res = await request(solution())
      .post('/posts');
    expect(res).toHaveHTTPStatus(422);
  });

  it('GET posts/:id/edit', async () => {
    const app = solution();
    const res1 = await request(app)
      .post('/posts')
      .type('form')
      .send({ title: 'post title', body: 'post body' });
    expect(res1).toHaveHTTPStatus(302);
    const url = res1.headers.location;
    const res2 = await request(app)
      .get(url);
    expect(res2).toHaveHTTPStatus(200);
  });


});
