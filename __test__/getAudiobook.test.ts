import { describe, expect, test } from 'vitest';
import { getAudiobook } from '../src/utils/getAudiobook';
import { AUDIOBOOKBAY_URL } from '../src/constants';

describe('Get Audiobook', () => {
  test('Get By URL', async () => {
    const audiobookUrl =
      'https://audiobookbay.fi/the-beginning-after-the-end-book-11-providence-turtleme';

    const data = await getAudiobook(audiobookUrl);

    expect(data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        categories: expect.any(Array),
        language: expect.any(String),
        cover: expect.toBeOneOf([expect.any(String), null]),
        authors: expect.any(Array),
        narrators: expect.any(Array),
        audioSample: expect.toBeOneOf([expect.any(String), null]),
        posted: expect.toBeOneOf([expect.any(String), null]),
        specs: {
          format: expect.toBeOneOf([expect.any(String), null]),
          bitrate: expect.toBeOneOf([expect.any(String), null]),
          bitrateKbps: expect.toBeOneOf([expect.any(Number), null]),
          size: expect.toBeOneOf([expect.any(Number), null]),
        },
        abridged: expect.toBeOneOf([expect.any(String), null]),
        description: expect.any(String),
        torrent: {
          hash: expect.toBeOneOf([expect.any(String), null]),
          announceUrl: expect.toBeOneOf([expect.any(String), null]),
          trackers: expect.any(Array),
          magnetUrl: expect.toBeOneOf([expect.any(String), null]),
        },
        related: expect.any(Array),
      })
    );
  });

  test('Get By Bad URL', async () => {
    await expect(getAudiobook('NOT REAL URL')).rejects.toThrow();
  });
});
