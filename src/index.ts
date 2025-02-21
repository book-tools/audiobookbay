import 'isomorphic-fetch';
import { AUDIOBOOKBAY_URL } from './constants';
import type { AudiobookDetails } from './interface/audiobook';
import type { Categories, Tags } from './interface/explore';
import type { AudioBookSearchResult, SearchIn } from './interface/search';
import { getAudiobook } from './utils/getAudiobook';
import { searchAudiobooks } from './utils/searchAudiobooks';

/**
 * Search Audiobooks
 *
 * @param query Audiobook Search query
 * @param page Current Page
 * @returns Audiobook List
 */
export const search = async (
  query: string,
  page: number = 1,
  searchIn: SearchIn = { content: true, titleAuthor: true, torrent: true }
): Promise<AudioBookSearchResult> => {
  try {
    const { titleAuthor, content, torrent } = searchIn;

    const params = new URLSearchParams({
      s: query.toLowerCase(),
      tt: [titleAuthor ? '1' : '', content ? '2' : '', torrent ? '3' : '']
        .filter(Boolean)
        .join(','),
    });
    const url = `${AUDIOBOOKBAY_URL}/page/${page}/?${params.toString()}`;

    return await searchAudiobooks(url);
  } catch (error) {
    console.error(error);
    throw new Error('Nothing was found');
  }
};

/**
 * Get Audiobook
 *
 * @param id Audiobook url
 * @param domain AudioBookBay site url
 * @returns Single Audiobook
 */
export const audiobook = async (
  id: string,
  domain?: string
): Promise<AudiobookDetails> => {
  try {
    return await getAudiobook(id, domain);
  } catch (error) {
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
  page: number = 1
): Promise<AudioBookSearchResult> => {
  try {
    return await searchAudiobooks(
      `${AUDIOBOOKBAY_URL}/audio-books/${
        type === 'category' ? 'type' : 'tag'
      }/${explore}/${page !== 1 ? 'page/' + page + '/' : ''}`
    );
  } catch (error) {
    throw new Error('You can explore only by category and tag');
  }
};
