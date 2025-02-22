# @book-tools/audiobookbay

## Install

```sh
npm install @book-tools/audiobookbay
```

## Search Audiobooks

### Options

| Name      | Description               | Default                                                                      | Type            |
| --------- | ------------------------- | ---------------------------------------------------------------------------- | --------------- |
| `query`   | Search Query              |                                                                              | `string`        |
| `options` | Search Options            | `{ page: 1, searchIn: { titleAuthor: true, content: true, torrent: true } }` | `SearchOptions` |
| `baseUrl` | Base URL for audiobookbay | `'https://audiobookbay.fi'`                                                  | `string`        |

#### SearchOptions

```ts
interface SearchOptions {
  /** The page of search results to pull */
  page: number;
  /** Which fields should be searched for the query string */
  searchIn: {
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
  };
}
```

### Example

```ts
import { search } from '@book-tools/audiobookbay';

// Search for "dune" with only the title and authors fields (generally the most relevant)
const audiobooks = await search('dune', {
  page: 1,
  searchIn: {
    titleAuthor: true,
    content: false,
    torrent: false,
  },
});
```

### Response

```ts
/** An audiobook object returned from a search */
interface SearchAudiobook extends BaseAudiobook {
  /** A list of AudioBookBay categories applied to the book */
  categories: string[];
  /** The full name of the audiobook's language */
  language: string;
  /** The URL for the book's cover image */
  cover: string | null;
  /** An ISO date string of the book's posting date */
  posted: string | null;
  /** Information about the audio files */
  specs: AudiobookSpecs;
}

interface AudiobookSearchResult {
  pagination: {
    currentPage: number;
    totalPages: number;
    count: number;
  };
  data: SearchAudiobook[];
}
```

## Explore Audiobooks

### Options

| Name      | Description                | Default                     | Type                    |
| --------- | -------------------------- | --------------------------- | ----------------------- |
| `type`    | Explore type               | `'category'`                | `'category'` \| `'tag'` |
| `explore` | Category or tag to explore |                             | `Categories` \| `Tags`  |
| `page`    | Page number                | 1                           | `number`                |
| `baseUrl` | Base URL for audiobookbay  | `'https://audiobookbay.fi'` | `string`                |

#### Categories & Tags

```ts
type AgeCategory = 'children' | 'teen-young-adult' | 'adults' | 'the-undead';

type Category = 'postapocalyptic' | 'action' | 'adventure' | /* ... */ | 'westerns';

type CategoryModifiers = 'anthology' | 'bestsellers' | /* ... */ | 'short-story';

type Tags = 'english' | 'dutch' | 'french' | 'spanish' | 'german';
```

### Example

```ts
import { explore } from '@book-tools/audiobookbay';

const audiobooks = await explore('category', 'fantasy', 2);
```

## Get Single Audiobook

### Options

| Name    | Description               | Default                     | Type   |
| ------- | ------------------------- | --------------------------- | ------ |
| id      | Audiobook ID/slug         |                             | string |
| baseUrl | Base URL for audiobookbay | `'https://audiobookbay.fi'` | string |

### Example

```ts
import { audiobook } from '@book-tools/audiobookbay';

const book = await audiobook(
  'the-road-to-dune-brian-herbert-kevin-j-anderson-frank-herbert'
);
```

### Response

```ts
/** The complete audiobook data returned from parsing */
export interface Audiobook extends SearchAudiobook {
  // FIELDS FROM BASE AUDIOBOOK

  /** The URL slug of the audiobook's page on AudioBookBay */
  id: string;
  /** The title of the book/torrent post */
  title: string;
  /** The list of authors' names */
  authors: string[];

  // FIELDS FROM SEARCH AUDIOBOOK

  /** A list of AudioBookBay categories applied to the book */
  categories: string[];
  /** The full name of the audiobook's language */
  language: string;
  /** The URL for the book's cover image */
  cover: string | null;
  /** An ISO date string of the book's posting date */
  posted: string | null;
  /** Information about the audio files */
  specs: AudiobookSpecs;

  // FIELDS SPECIFIC TO AUDIOBOOK

  /** The list of narrators' names */
  narrators: string[];
  /** A URL for an audio sample of the audiobook */
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

  // RELATED AUDIOBOOKS

  related: BaseAudiobook[];
}
```

## Example Usage

Included is an example using the library.

[usage-example.ts](./playground/usage-example.ts)

To run it from this repo:

```bash
npm run example
```

![](./docs/images/example-screenshot.png)
