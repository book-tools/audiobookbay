import { describe, expect, test } from 'vitest';
import type { Pagination } from '../src/interface/search';
import type { SearchAudiobook } from '../src/interface/audiobook';
import { explore, search } from '../src/index';
import { searchAudiobooks } from '../src/utils/searchAudiobooks';
import { getExploreUrl, getSearchUrl } from '../src/utils/url';

const expectedData = (data: {
  pagination: Pagination;
  data: SearchAudiobook[];
}) => {
  expect(data).toEqual(
    expect.objectContaining({
      pagination: {
        currentPage: expect.any(Number),
        totalPages: expect.any(Number),
        count: expect.any(Number),
      },
      data: expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          id: expect.any(String),
          authors: expect.any(Array),
          categories: expect.any(Array),
          language: expect.any(String),
          cover: expect.toBeOneOf([expect.any(String), null]),
          posted: expect.toBeOneOf([expect.any(String), null]),
          specs: {
            format: expect.toBeOneOf([expect.any(String), null]),
            bitrate: expect.toBeOneOf([expect.any(String), null]),
            bitrateKbps: expect.toBeOneOf([expect.any(Number), null]),
            size: expect.toBeOneOf([expect.any(Number), null]),
          },
        }),
      ]),
    })
  );
};

describe('Search Audiobooks', () => {
  test('Search Audiobook', async () => {
    const searchUrl = getSearchUrl('dune');
    expectedData(await searchAudiobooks(searchUrl));
  });

  test('Explore Audiobook', async () => {
    const searchUrl = getExploreUrl('category', 'fantasy', 2);
    expectedData(await searchAudiobooks(searchUrl));
  });

  test('Search', async () => {
    const data = await search('dune');
    expect(data.pagination.totalPages).toBeGreaterThan(1);
    expectedData(data);
  });

  test('Search - has cached result as Base64', async () => {
    // was searching Sci Fi and it kept parsing error on this book.
    // turns out is does a base64 body some titles.... no idea how often this happens but seems really rare.
    // To test: view http://audiobookbay.fi/?s=Centauri+Bliss with javascript disabled
    const result = await search('Centauri Bliss');
    expectedData(result);
  });

  test('explore category', async () => {
    const data = await explore('category', 'sci-fi');
    expect(data.pagination.totalPages).toBeGreaterThan(1);
    expectedData(data);
  });

  test('category with spaces parse - issue #6', async () => {
    const data = await explore('category', 'teen-young-adult');
    expect(data.pagination.totalPages).toBeGreaterThan(100);
    expectedData(data);
    expect(data.data[0].categories).toContain('Teen & Young Adult');
  });

  test('explore tag', async () => {
    const data = await explore('tag', 'german');
    expect(data.pagination.totalPages).toBeGreaterThan(1);
    expectedData(data);
  });
});
