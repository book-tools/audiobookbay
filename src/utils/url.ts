import {
  AUDIOBOOK_PATH_SLUG,
  AUDIOBOOKBAY_URL,
  EXPLORE_PATH_SLUG,
} from '../constants';
import { Categories, ExploreType, Tags } from '../interface/explore';
import type { SearchIn, SearchOptions } from '../interface/search';

/**
 * Prefix the URL with https:// if it doesn't already have it
 *
 * @param url URL to prefix
 * @returns URL with https:// prefix
 */
const prefixHttps = (url: string): string => {
  return url.includes('://')
    ? `https://${url.split('://')[1].trim()}`
    : `https://${url.trim()}`;
};

/**
 * Get the page path part of the URL. If the page is 1, it returns an empty string.
 *
 * @param page Current Page
 * @returns Page path part of the URL
 */
const getPagePathPart = (page: number): string => {
  // The page must be a positive integer
  let realPage = Math.floor(page);
  if (realPage < 1) {
    realPage = 1;
  }

  return realPage !== 1 ? `page/${realPage}/` : '';
};

export const defaultSearchIn: SearchIn = {
  titleAuthor: true,
  content: true,
  torrent: true,
};

export const getSearchInParam = (
  searchIn: Partial<SearchIn> = defaultSearchIn
) => {
  const tt = [
    searchIn.titleAuthor ? '1' : '',
    searchIn.content ? '2' : '',
    searchIn.torrent ? '3' : '',
  ]
    .filter(Boolean)
    .join(',');

  return tt;
};

const defaultOptions: SearchOptions = {
  page: 1,
  searchIn: defaultSearchIn,
};

export const getSearchUrl = (
  query: string,
  options: Partial<SearchOptions> = defaultOptions,
  baseUrl: string = AUDIOBOOKBAY_URL
): string => {
  const opts: SearchOptions = {
    ...defaultOptions,
    ...options,
  };

  const tt = getSearchInParam(opts.searchIn);

  const params = new URLSearchParams({
    s: query.toLowerCase(),
    tt,
  });

  const pagePathPart = getPagePathPart(opts.page);

  return `${prefixHttps(baseUrl)}/${pagePathPart}?${params.toString()}`;
};

export const getAudiobookUrl = (baseUrl: string, id: string) => {
  return `${prefixHttps(baseUrl)}/${AUDIOBOOK_PATH_SLUG}/${id}`;
};

/**
 * Explore Audiobooks by Categories and Tags
 *
 * @param type Explore type Category/Tag
 * @param explore Category/Tag name
 * @param page Current Page
 */
export function getExploreUrl(
  type: ExploreType,
  explore: Categories | Tags,
  page: number = 1,
  baseUrl: string = AUDIOBOOKBAY_URL
): string {
  const pagePathPart = getPagePathPart(page);

  return `${prefixHttps(baseUrl)}/${EXPLORE_PATH_SLUG}/${
    type === 'category' ? 'type' : 'tag'
  }/${explore}/${pagePathPart}`;
}
