import type { SearchAudiobook } from './audiobook';

export interface AudioBookSearchResult {
  data: SearchAudiobook[];
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
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
