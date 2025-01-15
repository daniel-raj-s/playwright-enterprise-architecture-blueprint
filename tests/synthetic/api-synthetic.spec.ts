import { test, expect } from '../../src/fixtures/authFixture';

test.describe('Synthetic API Monitor', () => {
  test('GET /posts/1 - should return post successfully and within threshold', async ({ apiClient }) => {
    const startTime = Date.now();
    const response = await apiClient.getPost(1);
    const duration = Date.now() - startTime;

    // Verify response status
    expect(response.status()).toBe(200);

    // Verify response body
    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
    expect(body).toHaveProperty('userId');

    // Performance threshold check (e.g., response should be under 1000ms)
    console.log(`GET /posts/1 response time: ${duration}ms`);
    expect(duration).toBeLessThan(1000);
  });

  test('POST /posts - should create new post successfully and within threshold', async ({ apiClient }) => {
    const startTime = Date.now();
    const response = await apiClient.createPost('Enterprise QA Blueprint', 'Boilerplate setup validation', 1);
    const duration = Date.now() - startTime;

    // Verify response status
    expect(response.status()).toBe(201);

    // Verify response body
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe('Enterprise QA Blueprint');
    expect(body.body).toBe('Boilerplate setup validation');
    expect(body.userId).toBe(1);

    // Performance threshold check (e.g., response should be under 1200ms)
    console.log(`POST /posts response time: ${duration}ms`);
    expect(duration).toBeLessThan(1200);
  });
});
