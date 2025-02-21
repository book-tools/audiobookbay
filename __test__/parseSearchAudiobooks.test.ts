import { readFile } from 'fs/promises';
import path from 'path';
import { describe, expect, test } from 'vitest';
import { AUDIOBOOKBAY_URL } from '../src/constants';
import { parseSearchAudiobooks } from '../src/utils/searchAudiobooks';

describe('Parse Audiobook Search Results', () => {
  test('Harry Potter', async () => {
    const html = await readFile(
      path.join(__dirname, 'html-pages', `harry-potter-search.html`),
      'utf8'
    );

    const data = parseSearchAudiobooks(AUDIOBOOKBAY_URL, html);

    expect(data).toEqual(
      expect.objectContaining({
        pagination: { currentPage: 1, totalPages: 13, count: 9 },
        data: [
          {
            id: 'harry-potter-y-la-camara-secreta-jk-rowling',
            title: 'Harry Potter y la Camara Secreta',
            authors: ['J.K. Rowling'],
            categories: ['Fantasy'],
            language: 'Spanish',
            cover:
              'https://m.media-amazon.com/images/I/51dMWPi24NL._SL500_.jpg',
            posted: '2025-02-05T05:00:00.000Z',
            specs: {
              format: 'M4B',
              bitrate: '96 Kbps',
              bitrateKbps: 96,
              size: 383988531,
            },
          },
          {
            id: 'hdarry-potter-et-les-reliques-de-la-mort-harry-potter-7-francais-jk-rowling',
            title:
              'Harry Potter et les Reliques de la Mort, Harry Potter 7, Français',
            authors: ['J.K. Rowling'],
            categories: ['Children', 'Fantasy'],
            language: 'French',
            cover:
              'https://m.media-amazon.com/images/I/6153sJbSmNL._SL500_.jpg',
            posted: '2025-02-05T05:00:00.000Z',
            specs: {
              format: 'MP3',
              bitrate: '96 Kbps',
              bitrateKbps: 96,
              size: 755582894,
            },
          },
          {
            id: 'harury-potter-et-le-prince-de-sang-mele-harry-potter-6-francais-jk-rowling',
            title:
              'Harry Potter et le Prince de Sang-Mêlé, Harry Potter 6, Français',
            authors: ['J.K. Rowling'],
            categories: ['Children', 'Fantasy'],
            language: 'French',
            cover:
              'https://m.media-amazon.com/images/I/51q+IsfG1JL._SL500_.jpg',
            posted: '2025-02-05T05:00:00.000Z',
            specs: {
              format: 'MP3',
              bitrate: '96 Kbps',
              bitrateKbps: 96,
              size: 929195622,
            },
          },
          {
            id: 'harryx-potter-et-lordre-du-phenix-harry-potter-5-francais-jk-rowling',
            title:
              'Harry Potter et l’Ordre du Phénix, Harry Potter 5, Français',
            authors: ['J.K. Rowling'],
            categories: ['Children', 'Fantasy'],
            language: 'French',
            cover:
              'https://m.media-amazon.com/images/I/51lbIDsiEeL._SL500_.jpg',
            posted: '2025-02-05T05:00:00.000Z',
            specs: {
              format: 'MP3',
              bitrate: '96 Kbps',
              bitrateKbps: 96,
              size: 2802466161,
            },
          },
          {
            id: 'hoarry-potter-et-la-coupe-de-feu-harry-potter-4-francais-jk-rowling',
            title: 'Harry Potter et la Coupe de Feu, Harry Potter 4, Français',
            authors: ['J.K. Rowling'],
            categories: ['Children', 'Fantasy'],
            language: 'French',
            cover:
              'https://m.media-amazon.com/images/I/61wPs39m8kL._SL500_.jpg',
            posted: '2025-02-05T05:00:00.000Z',
            specs: {
              format: 'MP3',
              bitrate: '96 Kbps',
              bitrateKbps: 96,
              size: 1836098519,
            },
          },
          {
            id: 'harryp-potter-et-le-prisonnier-dazkaban-harry-potter-3-francais-jk-rowling',
            title:
              'Harry Potter et le Prisonnier d’Azkaban, Harry Potter 3, Français',
            authors: ['J.K. Rowling'],
            categories: ['Children', 'Fantasy'],
            language: 'French',
            cover:
              'https://m.media-amazon.com/images/I/51602UnVOnL._SL500_.jpg',
            posted: '2025-02-05T05:00:00.000Z',
            specs: {
              format: 'MP3',
              bitrate: '96 Kbps',
              bitrateKbps: 96,
              size: 481254441,
            },
          },
          {
            id: 'harrcy-potter-et-la-chambre-des-secrets-harry-potter-2-francais-jk-rowling',
            title:
              'Harry Potter et la Chambre des Secrets, Harry Potter 2, Français',
            authors: ['J.K. Rowling'],
            categories: ['Children', 'Fantasy'],
            language: 'French',
            cover:
              'https://m.media-amazon.com/images/I/61MwCxsbkOL._SL500_.jpg',
            posted: '2025-02-05T05:00:00.000Z',
            specs: {
              format: 'MP3',
              bitrate: '96 Kbps',
              bitrateKbps: 96,
              size: 389871043,
            },
          },
          {
            id: 'hadrry-potter-a-lecole-des-sorciers-harry-potter-1-francais-jk-rowling',
            title:
              'Harry Potter à l’École des Sorciers, Harry Potter 1, Français',
            authors: ['J.K. Rowling'],
            categories: ['Children', 'Fantasy'],
            language: 'French',
            cover:
              'https://m.media-amazon.com/images/I/51tYQFOBhOL._SL500_.jpg',
            posted: '2025-02-05T05:00:00.000Z',
            specs: {
              format: 'MP3',
              bitrate: '96 Kbps',
              bitrateKbps: 96,
              size: 351094702,
            },
          },
          {
            id: 'harry-potter-bundle-books-1-7-norsk-jk-rowling',
            title: 'Harry Potter Bundle Books 1-7 Norsk',
            authors: ['J.K. Rowling'],
            categories: ['Children', 'Fantasy'],
            language: 'Norwegian',
            cover:
              'https://m.media-amazon.com/images/I/81mD0oA2ouL._SL1500_.jpg',
            posted: '2025-02-05T05:00:00.000Z',
            specs: {
              format: 'MP3',
              bitrate: '56 Kbps',
              bitrateKbps: 56,
              size: 3360811909,
            },
          },
        ],
      })
    );
  });

  test('Centauri Bliss (base64 results)', async () => {
    const html = await readFile(
      path.join(__dirname, 'html-pages', `centauri-bliss-search.html`),
      'utf8'
    );

    const data = parseSearchAudiobooks(AUDIOBOOKBAY_URL, html);

    expect(data).toEqual(
      expect.objectContaining({
        pagination: { currentPage: 1, totalPages: 1, count: 3 },
        data: [
          {
            id: 'centamuri-bliss-publishers-pack-3-books-5-6-skyler-grant',
            title: 'Centauri Bliss: Publisher’s Pack 3, Books 5-6',
            authors: ['Skyler Grant'],
            categories: ['Fantasy', 'Sci-Fi'],
            language: 'English',
            cover: 'https://i.imgur.com/zzKoHVP.jpg',
            // TODO: Figure out why this is null
            posted: null,
            specs: {
              format: 'M4B',
              bitrate: '128 Kbps',
              bitrateKbps: 128,
              size: 557643203,
            },
          },
          {
            id: 'centaurfi-bliss-publishers-pack-2-centauri-bliss-book-3-4-skyler-grant',
            title:
              'Centauri Bliss: Publisher’s Pack 2, Centauri Bliss, Book 3-4',
            authors: ['Skyler Grant'],
            categories: ['Adults', 'Fantasy', 'Sci-Fi'],
            language: 'English',
            cover:
              'https://m.media-amazon.com/images/I/51D1uAoYh-L._SL500_.jpg',
            posted: null,
            specs: {
              format: 'M4B',
              bitrate: '128 Kbps',
              bitrateKbps: 128,
              size: 569722798,
            },
          },
          {
            id: 'ceentauri-bliss-series-books-1-2-skyler-grant',
            title: 'Centauri Bliss Series, Books 1-2',
            authors: ['Skyler Grant'],
            categories: ['Adults', 'Sci-Fi', 'Sex Scenes'],
            language: 'English',
            cover:
              'https://images.gr-assets.com/books/1535167034l/41453060.jpg',
            posted: null,
            specs: {
              format: 'M4B',
              bitrate: '64 Kbps',
              bitrateKbps: 64,
              size: 325373133,
            },
          },
        ],
      })
    );
  });
});
