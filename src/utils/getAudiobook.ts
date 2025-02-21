import { load as loadCheerioPage } from 'cheerio';
import type { Audiobook, BaseAudiobook } from '../interface/audiobook';
import { generateMagnetUrl } from './generateMagnetUrl';
import {
  cleanString,
  parseBitrate,
  parseCoverUrl,
  parseDate,
  parseFileSize,
  parseFormat,
  parseTitleAuthor,
  parseUrlSlug,
} from './fields';
import { cleanDescription } from './string';
import { USER_AGENT } from '../constants';

export const parseAudiobook = (
  url: string,
  baseUrl: string,
  html: string
): Audiobook => {
  const $ = loadCheerioPage(html);

  // Title
  const { title } = parseTitleAuthor($('.postTitle h1').text());
  if (!title) {
    throw new Error('Failed to get Audiobook');
  }

  // Category
  const categories: string[] = [];
  $('.postInfo a').each((_, el) => {
    if ($(el).attr('rel') === 'category tag') {
      categories.push(cleanString($(el).text()));
    }
  });

  // Language
  const language = $('.postInfo a span[itemprop="inLanguage"]').text();

  // Cover
  const coverSrc = $('.postContent').find('img[itemprop="image"]').attr('src');
  const cover = parseCoverUrl(baseUrl, coverSrc);

  const descEl = $('.desc');

  // Author/s
  const authors: string[] = [];
  descEl.find('span.author').each((_, el) => {
    authors.push(cleanString($(el).text()));
  });

  // Voice Actor Name
  const narrators: string[] = [];
  descEl.find('span.narrator').each((_, el) => {
    narrators.push($(el).text().trim());
  });

  // Audio Sample in MP3
  const audioSample: string | null = $('audio')?.attr('src') ?? null;

  // Format
  const format = parseFormat(descEl.find('span.format').text());

  // Bitrate
  const bitrateStr = descEl.find('span.bitrate').text();
  const { bitrate, bitrateKbps } = parseBitrate(bitrateStr);

  // Abridged
  const abridged = descEl.find('span.is_abridged').text();

  // Description
  const descriptionArr: string[] = [];
  descEl.find('p:not(:first-child)').each((_, pEl) => {
    const cleanP = cleanDescription($(pEl).html() ?? '');

    if (cleanP) {
      descriptionArr.push(cleanP.trim());
    }
  });
  const description = descriptionArr.join('\n\n');

  // Tracker, Torrent Hash, File Size
  let announceUrl: string | null = null;
  const trackers: string[] = [];
  let hash: string | null = null;
  let posted: string | null = null;
  let size: number | null = null;

  $('.postContent table tr').each((_, element) => {
    const tdFirst = $(element).find('td:first-child').text().trim();
    const tdSecond = $(element).find('td:last-child').text().trim();

    if (!tdFirst || !tdSecond || tdFirst === tdSecond) {
      return;
    }

    switch (tdFirst) {
      case 'Announce URL:':
        announceUrl = tdSecond;
        break;

      case 'Tracker:':
        trackers.push(tdSecond);
        break;

      case 'Info Hash:':
        hash = tdSecond;
        break;

      case 'Creation Date:':
        posted = parseDate(tdSecond);
        break;

      case 'File Size:':
      case 'Combined File Size:':
        size = parseFileSize(tdSecond);
        break;

      default:
        break;
    }
  });

  // Related Audiobooks
  const related: BaseAudiobook[] = [];

  $(`#rsidebar ul li`).each((_, element) => {
    if ($(element).find('h2').text().includes('Related')) {
      $(element)
        .find('ul li')
        .each((_, relatedEl) => {
          const linkEl = $(relatedEl).find('a');

          const relatedUrl = linkEl.attr('href');
          const relatedTitleAuthors = parseTitleAuthor(linkEl.text());

          if (relatedUrl) {
            related.push({
              id: parseUrlSlug(relatedUrl),
              title: relatedTitleAuthors.title,
              authors: relatedTitleAuthors.authors,
            });
          }
        });
    }
  });

  const magnetUrl = generateMagnetUrl(hash, title, trackers);

  const id = parseUrlSlug(url);

  const book: Audiobook = {
    id,
    title,
    categories,
    language,
    cover,
    authors,
    narrators,
    audioSample,
    posted,
    specs: {
      format,
      bitrate,
      bitrateKbps,
      size,
    },
    abridged,
    description,
    torrent: {
      hash,
      announceUrl,
      trackers,
      magnetUrl,
    },
    related,
  };

  return book;
};

export const getAudiobook = async (
  url: string,
  baseUrl: string
): Promise<Audiobook> => {
  const audiobookRes = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: { 'User-Agent': USER_AGENT },
  });
  const audiobookHtml = await audiobookRes.text();
  return parseAudiobook(url, baseUrl, audiobookHtml);
};
