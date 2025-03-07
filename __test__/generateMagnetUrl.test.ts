import { describe, expect, test } from 'vitest';
import { generateMagnetUrl } from '../src/utils/generateMagnetUrl';

describe('generateMagnetUrl', () => {
  test('normal magnet link', async () => {
    const url = generateMagnetUrl('123123', 'test', []);
    expect(url).toBe('magnet:?xt=urn:btih:123123&dn=test');
  });

  test('title with spaces', async () => {
    const url = generateMagnetUrl('123123', 'this is a long title', []);
    expect(url).toBe('magnet:?xt=urn:btih:123123&dn=this+is+a+long+title');
  });

  test('with trackers', async () => {
    const url = generateMagnetUrl('123123', 'test', [
      'http://tracker.fake.com1',
      'http://tracker.fake.com2',
    ]);
    expect(url).toBe(
      'magnet:?xt=urn:btih:123123&dn=test&tr=http%3A%2F%2Ftracker.fake.com1&tr=http%3A%2F%2Ftracker.fake.com2'
    );
  });

  test('with no hash', async () => {
    const url = generateMagnetUrl(null, 'test', []);
    expect(url).toBe(null);
  });

  test('with empty hash', async () => {
    const url = generateMagnetUrl('', 'test', []);
    expect(url).toBe(null);
  });
});
