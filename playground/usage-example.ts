import { inspect } from 'util';
import pc from 'picocolors';
import { AudiobookSearchResult } from '../src/interface/search';
import { search } from '../src/index';
import { getAudiobook } from '../src/utils/getAudiobook';
import { AUDIOBOOKBAY_URL } from '../src/constants';

// search params
const searchTerm = 'John Bierce';
const titleFilters = ['mage'];
const getMagnetLink = true; // set to false to skip magnet link retrieval

async function main() {
  // setup variables
  const maxPages = 5;
  let currentPage = 0;
  let searchResult: AudiobookSearchResult = {
    data: [],
    pagination: { currentPage: 0, totalPages: 1, count: 0 },
  };

  // search for audio books
  while (
    currentPage < searchResult.pagination.totalPages &&
    currentPage < maxPages
  ) {
    currentPage += 1;
    const nextPage = await search(searchTerm.toLowerCase().trim(), {
      page: currentPage,
    });
    searchResult.data = searchResult.data.concat(nextPage.data); // add results to original array
    searchResult.pagination = nextPage.pagination; // update pagination
  }

  // apply additional filtering
  if (titleFilters.length > 0) {
    searchResult.data = searchResult.data.filter((book) => {
      // filter by title
      let allMatch = true;
      titleFilters.forEach((titleFilter) => {
        if (
          book.title.toLowerCase().indexOf(titleFilter.toLowerCase().trim()) < 0
        ) {
          allMatch = false;
        }
      });
      return allMatch;
    });
  }

  let pos = 1;
  for (const item of searchResult.data) {
    console.log(`${pos} - ${pc.green(item.title)} - ${pc.gray(item.id)}`);
    if (getMagnetLink) {
      const book = await getAudiobook(item.id, AUDIOBOOKBAY_URL);
      console.log('magnetUrl: ' + pc.yellow(pc.dim(book.torrent.magnetUrl)));
      console.log('Full Book JSON:');
      console.log(
        inspect(book, { showHidden: false, depth: null, colors: true })
      );
      console.log(pc.blue(`---------------`));
      // wait 500ms before next request to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    pos += 1;
  }
  console.log(`${pc.yellow('Search term:')} ${searchTerm}`);
  console.log(`${pc.yellow('Title Filters:')} ${titleFilters.join(',')}`);
  console.log(`${pc.yellow('Result Count:')} ${searchResult.data.length}`);
}
main()
  .then(() => {
    console.log(pc.green('--Done--'));
  })
  .catch((ex) => {
    console.error(pc.red(`Error: ${ex}`));
  });
