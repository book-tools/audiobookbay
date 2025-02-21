import { load as loadCheerioPage } from 'cheerio';
import { AUDIOBOOKBAY_URL } from '../constants';
import type { AudioBookSearchResult, Pagination } from '../interface/search';
import type { SearchAudiobook } from '../interface/audiobook';

/**
 * Search Audiobooks
 *
 * @param {string} url URL for audiobooks to scrape
 * @param {string} domain URL for audiobooks to scrape
 */
export const searchAudiobooks = async (
  url: string,
  domain?: string
): Promise<AudioBookSearchResult> => {
  const request = await fetch(url);
  const results = await request.text();
  const $ = loadCheerioPage(results);

  // Nothing is Found Error
  if ($(`#content h3`).text().trim() === 'Not Found') {
    throw new Error('Nothing was found');
  }
  // Get Details for each audiobook
  const data: SearchAudiobook[] = [];
  const posts = $(`#content div.post`);

  posts.each((_i, elementItem) => {
    // assign the element to a variable, we may need to override it
    let element = $(elementItem);
    let postRoot = $;

    const isBase64ElementBody = element.attr('class')?.includes('post re-ab');
    // so.... sometimes the post body is encoded in base64, so we need to decode it...
    // guessing this is some type of cacheing thingy????
    if (isBase64ElementBody) {
      // lets change our element and postRoot to use the decoded element
      const postAsBase64 = postRoot(element).text();
      postRoot = loadCheerioPage(
        Buffer.from(postAsBase64, 'base64').toString('utf8')
      );
      element = postRoot('body');
    }

    const audiobookTitleEl = postRoot(element).find(`div.postTitle h2 a`);

    // Title
    const title = audiobookTitleEl.text();

    // ID
    let id = '';
    const bookHref = audiobookTitleEl.attr('href');

    if (bookHref) {
      id = bookHref.split('/').filter(Boolean).pop() ?? '';
    }

    const postInfo = postRoot(element).find(`.postInfo`).text();

    // Category
    const categories = postInfo
      .split('Language:')[0]
      .replace('Category:', '')
      .trim()
      .split(String.fromCharCode(160))
      .map((e) => e.trim());

    // Language
    let lang = '';

    if (
      postInfo.indexOf('Language:') >= 0 &&
      postInfo.indexOf('Keywords:') >= 0
    ) {
      lang = postInfo.split('Language: ')[1].split(`Keywords:`)[0];
    }

    // Cover
    let cover: string = `${
      domain ?? `${AUDIOBOOKBAY_URL}/images/default_cover.jpg`
    }`;
    const coverUrl = postRoot(element).find(`.postContent img`).attr('src');

    if (coverUrl && coverUrl !== '') {
      cover = coverUrl;
    }

    // Posted
    const posted = postRoot(`p[style="text-align:center;"]`)
      .text()
      .split('Posted:')[1]
      .split('Format:')[0]
      .trim();

    // Format
    const format = postRoot(element)
      .find(`.postContent span[style="color:#a00;"]:nth-child(2)`)
      .text();

    // Unit
    const unit = postRoot(element)
      .find(`.postContent span[style="color:#a00;"]:nth-child(3)`)
      .text();

    // Size
    const size = postRoot(element)
      .find(`.postContent span[style="color:#00f;"]`)
      .text();

    const sizeUnitText = postRoot(element)
      .find(`p[style="text-align:center;"]`)
      .text();

    let sizeUnit = '';
    if (
      sizeUnitText.indexOf(size) >= 0 &&
      sizeUnitText.split(size).length > 0
    ) {
      sizeUnit = sizeUnitText.split(size)[1].trim();
    }

    const audiobook: SearchAudiobook = {
      title: title,
      id,
      categories,
      lang,
      cover,
      posted,
      info: {
        format,
        unit,
        size,
        sizeUnit,
      },
    };

    data.push(audiobook);
  });

  // Paggination
  const pagination: Pagination = {
    currentPage: 0,
    totalPages: 0,
  };

  if ($(`.navigation .current`).text() !== '') {
    const currentPage = parseInt($(`.navigation .current`).text());
    let total: number = 0;

    if ($(`.navigation .wp-pagenavi a:last-child`).text() === '»»') {
      const totalEl = $(`.navigation .wp-pagenavi a:last-child`).attr('href');

      if (totalEl) {
        total = parseInt(totalEl.split('/page/')[1].split('/')[0], 10);
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

  const result: AudioBookSearchResult = {
    pagination,
    data,
  };

  return result;
};
