import { load as loadCheerioPage } from 'cheerio';
import { AUDIOBOOKBAY_URL } from '../constants';
import type {
  AudiobookDetails,
  RelatedAudiobook,
} from '../interface/audiobook';
import { generateMagnetUrl } from './generateMagnetUrl';

export const getAudiobook = async (
  id: string,
  domain?: string
): Promise<AudiobookDetails> => {
  const audiobookUrl = encodeURI(`${domain ?? AUDIOBOOKBAY_URL}/abss/${id}/`);
  const request = await fetch(audiobookUrl);
  const results = await request.text();
  const $ = loadCheerioPage(results);

  // Title
  const title = $('.postTitle h1').text();

  // Category
  const category: string[] = [];
  $('.postInfo a').each((_index, el) => {
    if ($(el).attr('rel') === 'category tag') {
      category.push($(el).text());
    }
  });

  // Language
  const lang = $('.postInfo a span[itemprop="inLanguage"]').text();

  // Cover
  let cover: string = '';
  const coverUrl = $('.postContent')
    .find('img[itemprop="thumbnailUrl"]')
    .attr('src');

  if (coverUrl === '/images/default_cover.jpg') {
    cover = `${domain ?? AUDIOBOOKBAY_URL}/${coverUrl}`;
  } else {
    cover = coverUrl ?? '';
  }

  const descEl = $('.desc');

  // Author/s
  const author = descEl.find('span[class="author"]').text();

  // Voice Actor Name
  const read = descEl.find('span[class="narrator"]').text();

  // Audio Sample in MP3
  let audioSample;
  if (results.search('<audio') !== -1) {
    audioSample = $(`audio`).attr('src');
  }

  // Format
  const format = descEl.find('span[class="format"]').text();

  // Bitrate
  const bitrate = descEl.find('span[class="bitrate"]').text();

  // Abridged
  const abridged = descEl.find('span[class="is_abridged"]').text();

  // Description
  const description = descEl.find('p:not(:first-child)').text();

  // Torrent Size
  const size = $(
    '.postContent table tr:nth-last-child(11) td:last-child'
  ).text();

  // Tracker, Torrent Hash
  const trackers: string[] = [];
  let hash: string = '';

  $('.postContent table tr').each((index, element) => {
    const tdFirst = $(element).find('td:first-child');
    const tdSecond = $(element).find('td:last-child');

    switch (tdFirst.text()) {
      case 'Tracker:':
        trackers.push(tdSecond.text());
        break;

      case 'Info Hash:':
        hash = tdSecond.text();
        break;
    }
  });

  // Related Audiobooks
  const related: RelatedAudiobook[] = [];

  $(`#rsidebar ul li`).each((index, element) => {
    if ($(element).find('h2').text().includes('Related')) {
      $(element)
        .find('ul li')
        .each((_, relatedEl) => {
          const linkEl = $(relatedEl).find('a');

          const title = linkEl.text();

          let urlEl = linkEl.attr('href');

          if (urlEl) {
            related.push({
              title,
              id: urlEl.replace('/audio-books/', '').replace('/', ''),
            });
          }
        });
    }
  });

  const result: AudiobookDetails = {
    title,
    categories: category,
    lang,
    cover,
    author,
    read,
    audioSample,
    specs: {
      format,
      bitrate,
    },
    abridged,
    description,
    torrent: {
      hash,
      trackers,
      size,
      magnetUrl: generateMagnetUrl(hash, title, trackers),
    },
    related,
  };

  return result;
};
