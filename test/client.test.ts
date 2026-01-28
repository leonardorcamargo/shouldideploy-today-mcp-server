import { makeRequest } from '../src/client';

describe('Client API test', () => {
  it('Should request Client API with success', async () => {
    const result = await makeRequest({});

    console.log(result);
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('timezone');
    expect(result).toHaveProperty('date');
    expect(result).toHaveProperty('shouldideploy');
    expect(result).toHaveProperty('message');
  })
})