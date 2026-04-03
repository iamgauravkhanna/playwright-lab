import { expect, request, test } from '@playwright/test';

test('api: GET and POST with an isolated request context', async () => {
  const api = await request.newContext({
    baseURL: 'http://127.0.0.1:4173',
  });

  try {
    const statusResponse = await api.get('/api/status');
    expect(statusResponse.status()).toBe(200);

    const statusJson = await statusResponse.json();
    expect(statusJson).toMatchObject({
      status: 'ok',
      timestamp: '2026-04-02T00:00:00.000Z',
    });

    const createResponse = await api.post('/api/todos', {
      data: { title: 'API seed item' },
    });
    expect(createResponse.status()).toBe(201);

    const created = await createResponse.json();
    expect(created).toMatchObject({ title: 'API seed item' });

    const listResponse = await api.get('/api/todos');
    expect(listResponse.status()).toBe(200);

    const listJson = await listResponse.json();
    expect(Array.isArray(listJson.items)).toBe(true);
    expect(
      listJson.items.some(
        (item: { title: string }) => item.title === 'API seed item',
      ),
    ).toBe(true);
  } finally {
    await api.dispose();
  }
});
