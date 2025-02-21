/**
 * Search result AudioBook
 */
export interface SearchAudiobook {
  title: string;
  id: string;
  categories: string[];
  lang: string;
  cover: string;
  posted: string;
  info: {
    format: string;
    unit: string;
    size: string;
    sizeUnit: string;
  };
}

export interface RelatedAudiobook {
  title: string;
  id: string;
}

/**
 * Full details of an audiobook
 */
export interface AudiobookDetails {
  title: string;
  categories: string[];
  lang: string;
  cover: string | undefined;
  author: string;
  read: string;
  audioSample: string | undefined;
  specs: {
    format: string;
    bitrate: string;
  };
  abridged: string;
  description: string;
  torrent: {
    hash: string | undefined;
    trackers: string[];
    size: string;
    magnetUrl: string | undefined;
  };
  related: RelatedAudiobook[];
}
