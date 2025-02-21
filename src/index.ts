import 'isomorphic-fetch';
import { AUDIOBOOKBAY_URL, EXPLORE_PATH_SLUG } from './constants';
import type { Categories, Tags } from './interface/explore';
import type { Audiobook } from './interface/audiobook';
import type { AudiobookSearchResult, SearchOptions } from './interface/search';
import { getAudiobook } from './utils/getAudiobook';
import { searchAudiobooks } from './utils/searchAudiobooks';
import { getAudiobookUrl, getSearchUrl } from './utils/url';

/**
 * Search Audiobooks
 *
 * @param query Audiobook Search query
 * @param options Search options
 * @param options.page Current Page
 * @param options.searchIn Which fields should be searched for the query string
 * @param options.includeCategories Which categories to include in the search
 * @param options.excludeCategories Which categories to exclude from the search
 * @param baseUrl Base URL for audiobooks to scrape
 * @returns Audiobook List
 */
export const search = async (
  query: string,
  options?: Partial<SearchOptions>,
  baseUrl: string = AUDIOBOOKBAY_URL
): Promise<AudiobookSearchResult> => {
  try {
    const url = getSearchUrl(query, options, baseUrl);

    return await searchAudiobooks(url, baseUrl);
  } catch (error) {
    console.error(error);
    throw new Error('Nothing was found');
  }
};

/**
 * Get Audiobook
 *
 * @param id Audiobook url
 * @param baseUrl AudioBookBay site url
 * @returns Single Audiobook
 */
export const audiobook = async (
  id: string,
  baseUrl: string = AUDIOBOOKBAY_URL
): Promise<Audiobook> => {
  try {
    const audiobookUrl = getAudiobookUrl(id, baseUrl);
    return await getAudiobook(id, audiobookUrl);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get Audiobook');
  }
};

/**
 * Explore Audiobooks by Categories and Tags
 *
 * @param type Explore type Category/Tag
 * @param explore Category/Tag name
 * @param page Current Page
 */
export const explore = async (
  type: 'category' | 'tag',
  explore: Categories | Tags,
  page: number = 1,
  baseUrl: string = AUDIOBOOKBAY_URL
): Promise<AudiobookSearchResult> => {
  try {
    const exploreUrl = `${baseUrl}/${EXPLORE_PATH_SLUG}/${
      type === 'category' ? 'type' : 'tag'
    }/${explore}/${page !== 1 ? 'page/' + page + '/' : ''}`;

    return await searchAudiobooks(exploreUrl, baseUrl);
  } catch (error) {
    console.error(error);
    throw new Error('You can explore only by category and tag');
  }
};
