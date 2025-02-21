export interface BaseAudiobook {
  /** The URL slug of the AbbBook's page on AbbBookbay */
  id: string;
  /** The title of the book/torrent post */
  title: string;
  /** The list of authors' names */
  authors: string[];
}

export interface AudiobookSpecs {
  /** The file format of the audio file(s) */
  format: string | null;
  /**
   * The average bitrate of the audio file(s)
   *
   * @example "128 kbps"
   * @example "Variable"
   */
  bitrate: string | null;
  /** The average bitrate of the audio file(s) in Kbps */
  bitrateKbps: number | null;
  /** The total size of all files in bytes */
  size: number | null;
}

/** An AbbBook object returned from a search */
export interface SearchAudiobook extends BaseAudiobook {
  /** A list of AbbBookbay categories applied to the book */
  categories: string[];
  /** The full name of the AbbBook's language */
  language: string;
  /** The URL for the book's cover image */
  cover: string | null;
  /** An ISO date string of the book's posting date */
  posted: string | null;
  /** Information about the audio files */
  specs: AudiobookSpecs;
}

/** The complete AbbBook data returned from parsing */
export interface Audiobook extends SearchAudiobook {
  /** The list of narrators' names */
  narrators: string[];
  /** A URL for an audio sample of the AbbBook */
  audioSample: string | null;
  /**
   * The type of abridgement the book has, or null if it is unabridged
   *
   * @example "Dramatization"
   */
  abridged: string | null;
  /** A complete text description of the torrent */
  description: string;
  torrent: {
    /** The Info Hash for the torrent */
    hash: string | null;
    /** The primary tracker URL for the torrent */
    announceUrl: string | null;
    /** A list of tracker URLs for the torrent */
    trackers: string[];
    /** The magnet URL for the torrent */
    magnetUrl: string | null;
  };
  related: BaseAudiobook[];
}
