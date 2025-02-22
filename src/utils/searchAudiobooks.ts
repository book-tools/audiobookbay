import { load as loadCheerioPage } from 'cheerio';
import type { AudiobookSearchResult, Pagination } from '../interface/search';
import type { SearchAudiobook } from '../interface/audiobook';
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
import { fetchPageContent } from './url';
import { AUDIOBOOKBAY_URL } from '../constants';

export const getHtmlPostContent = (postContent: string): string => {
  const $ = loadCheerioPage(postContent);

  // Get the post element
  const postEl = $('div.post');

  // Check if the post element is encoded in base64
  const isBase64ElementBody = postEl.attr('class')?.includes('post re-ab');
  // so.... sometimes the post body is encoded in base64, so we need to decode it...
  // guessing this is some type of caching thingy????
  if (isBase64ElementBody) {
    // lets change our element and postRoot to use the decoded element
    const postAsBase64 = postEl.text();
    const postAsUtf8 = Buffer.from(postAsBase64, 'base64').toString('utf8');
    const newPage = loadCheerioPage(postAsUtf8);

    const postHtml = newPage('body').html();
    if (!postHtml) {
      throw new Error('Failed to get post content');
    }
    return postHtml;
  }

  const postHtml = postEl.html();
  if (!postHtml) {
    throw new Error('Failed to get post content');
  }

  return postHtml;
};

export const parseSearchAudiobooks = (
  html: string,
  baseUrl: string = AUDIOBOOKBAY_URL
): AudiobookSearchResult => {
  const $ = loadCheerioPage(html);

  // Nothing is Found Error
  if ($(`#content h3`).text().trim() === 'Not Found') {
    throw new Error('Nothing was found');
  }
  // Get Details for each audiobook
  const data: SearchAudiobook[] = [];

  $(`#content div.post`).each((_, initialPostEl) => {
    const postElHtml = $(initialPostEl).prop('outerHTML');
    const postContent = getHtmlPostContent(postElHtml);
    const postEl = loadCheerioPage(postContent)('body');

    const titleEl = postEl.find(`div.postTitle h2 a`);

    // Title
    const { title, authors } = parseTitleAuthor(titleEl.text());

    // ID
    let id: string | undefined;
    const bookUrl = titleEl.attr('href');

    if (bookUrl) {
      id = parseUrlSlug(bookUrl);
    } else {
      return;
    }

    // Category
    const categories = postEl
      .find(`.postInfo`)
      .text()
      ?.split('Language:')[0]
      .replace('Category:', '')
      .trim()
      .split(String.fromCharCode(160))
      .map(cleanString);

    // Language
    const language = cleanString(
      postEl
        .find(`.postInfo`)
        .text()
        ?.split(`Language:`)[1]
        .split(`Keywords:`)[0]
    );

    // Cover
    const coverSrc = postEl.find(`.postContent img`).attr('src');
    const cover = parseCoverUrl(baseUrl, coverSrc);

    // Posted
    const postedStr = $(`p[style="text-align:center;"]`)
      .text()
      ?.split(`Posted: `)[1]
      ?.split(`Format: `)[0];
    const posted = parseDate(postedStr);

    // Format
    const format = parseFormat(
      postEl.find(`.postContent span[style="color:#a00;"]:nth-child(2)`).text()
    );

    // Unit
    const bitrateStr = postEl
      .find(`.postContent span[style="color:#a00;"]:nth-child(3)`)
      .text();
    const { bitrate, bitrateKbps } = parseBitrate(bitrateStr);

    // Size
    let size = postEl.find(`.postContent span[style="color:#00f;"]`).text();
    const sizeUnit = postEl
      .find(`p[style="text-align:center;"]`)
      .text()
      .split(size)[1]
      .trim();
    size = `${size} ${sizeUnit}`;

    const sizeBytes = parseFileSize(size);

    const audiobook: SearchAudiobook = {
      id,
      title,
      authors,
      categories,
      language,
      cover,
      posted,
      specs: {
        format,
        bitrate,
        bitrateKbps,
        size,
        sizeBytes,
      },
    };

    data.push(audiobook);
  });

  // Pagination
  const pagination: Pagination = {
    currentPage: 1,
    totalPages: 1,
    count: data.length,
  };

  if ($(`.navigation .current`).text()) {
    const currentPage = parseInt($(`.navigation .current`).text(), 10);
    let total = 0;

    if ($(`.navigation .wp-pagenavi a:last-child`).text() === '»»') {
      const totalHref = $(`.navigation .wp-pagenavi a:last-child`).attr('href');

      if (totalHref) {
        total = parseInt(totalHref.split('/page/')[1].split('/')[0], 10);
      }
    } else {
      total = parseInt(
        $(`.navigation .wp-pagenavi a:nth-last-child(2)`).text(),
        10
      );
    }

    if (total + 1 === currentPage) {
      total = currentPage;
    }

    pagination.currentPage = currentPage;
    pagination.totalPages = total;
  }

  const result: AudiobookSearchResult = {
    pagination,
    data,
  };

  return result;
};

/**
 * Search Audiobooks
 *
 * @param {string} url URL for audiobooks to scrape
 * @param {string} baseUrl Base URL for audiobooks to scrape
 */
export const searchAudiobooks = async (
  url: string,
  baseUrl: string = AUDIOBOOKBAY_URL
): Promise<AudiobookSearchResult> => {
  const searchHtml = await fetchPageContent(url);
  return parseSearchAudiobooks(searchHtml, baseUrl);
};
