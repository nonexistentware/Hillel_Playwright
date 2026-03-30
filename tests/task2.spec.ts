import { test, expect } from '@playwright/test';
import { VALID_USER } from '../pom/test-data/user';

let sidCookie: string;

test.describe('POST /api/cars', () => {
  test.beforeAll(async ({ request }) => {
    const loginRes = await request.post('/api/auth/signin', {
      data: {
        email: VALID_USER.email,
        password: VALID_USER.password,
        remember: false,
      },
    });
    expect(loginRes.status()).toBe(200);
    const setCookie = loginRes.headers()['set-cookie'] ?? '';
    const match = setCookie.match(/sid=([^;]+)/);
    sidCookie = match ? match[1] : '';
  });

  test('positive: successfully creates a car with valid data', async ({ request }) => {
    const response = await request.post('/api/cars', {
      headers: { Cookie: `sid=${sidCookie}` },
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122,
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(body.data.carBrandId).toBe(1);
    expect(body.data.carModelId).toBe(1);
    expect(body.data.mileage).toBe(122);
  });

  test('negative: returns 401 when creating a car without authorization', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 100,
      },
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.status).toBe('error');
  });

  test('negative: returns 400 when creating a car with missing required fields', async ({ request }) => {
    const response = await request.post('/api/cars', {
      headers: { Cookie: `sid=${sidCookie}` },
      data: {
        carBrandId: 1,
      },
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.status).toBe('error');
  });
});