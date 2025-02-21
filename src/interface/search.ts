import type { SearchAudiobook } from './audiobook';

export interface AudiobookSearchResult {
  data: SearchAudiobook[];
  pagination: Pagination;
}

export interface Pagination {
  /** The current page of the search results */
  currentPage: number;
  /** The total number of pages available */
  totalPages: number;
  /** The total number of results found on the current page */
  count: number;
}

/**
 * Extra search options for what text content should be searched
 */
export interface SearchIn {
  /**
   * Search in Title and Authors fields
   *
   * @defaultValue true
   */
  titleAuthor: boolean;
  /**
   * Search in book page's Content
   *
   * @defaultValue true
   */
  content: boolean;
  /**
   * Search in the torrent's contents
   *
   * @defaultValue true
   */
  torrent: boolean;
}

export interface SearchOptions {
  /** The page of search results to pull */
  page: number;
  /** Which fields should be searched for the query string */
  searchIn: Partial<SearchIn>;
}
