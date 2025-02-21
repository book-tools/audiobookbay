import { readFile } from 'fs/promises';
import path from 'path';
import { describe, expect, test } from 'vitest';
import { parseAudiobook } from '../src/utils/getAudiobook';
import { AUDIOBOOKBAY_URL } from '../src/constants';
import { getAudiobookUrl } from '../src/utils/url';

describe('Parse Audiobook', () => {
  test('The Last Echo of the Lord of Bells', async () => {
    const exactId =
      'the-qlast-echo-of-the-lord-of-bells-mage-errant-7-john-bierce';

    const html = await readFile(
      path.join(__dirname, 'html-pages', `${exactId}.html`),
      'utf8'
    );

    const bookUrl = getAudiobookUrl(AUDIOBOOKBAY_URL, exactId);
    const data = parseAudiobook(bookUrl, AUDIOBOOKBAY_URL, html);

    expect(data).toEqual(
      expect.objectContaining({
        id: exactId,
        title: 'The Last Echo of the Lord of Bells (Mage Errant #7)',
        categories: ['Fantasy', 'LitRPG', 'Teen & Young Adult'],
        language: 'English',
        cover: 'https://m.media-amazon.com/images/I/616Cy6d4EOL.jpg',
        authors: ['John Bierce'],
        narrators: [],
        audioSample: null,
        posted: '2023-08-30T22:29:24.000Z',
        specs: {
          format: 'M4B',
          bitrate: '128 Kbps',
          bitrateKbps: 128,
          size: 1460288881,
        },
        abridged: '',
        description:
          'A new kind of war has come to the continent of Ithos.\n' +
          '\n' +
          'Airborne mage armies traverse enemy territory in utter secrecy. Vast city-liches conspire to influence events from afar, while city-states and archmages unleash strange new magics in a rapidly accelerating magical arms race. Nations and great powers that have remained quiescent for years have begun reaching out into the growing power vacuum. Magical superweapons and giant monsters are wielded by every side in a deadly tangle of alliances and factions, as each squabbling force spirals in towards their inevitable final conflict. At the center of that spiral lays the capital of the Havath Dominion, where a vengeful madman has proclaimed the precise date and time he will destroy the city.\n' +
          '\n' +
          'The Last Echo will ring, and in its wake looms the threat of the Tongue Eater. Hugh and his friends are the only ones who can stop the ancient weapon, but the web of lies they’ve woven is fraying rapidly, and even their own allies have begun to question their mission. Monsters and archmages capable of leveling cities would stop at nothing to claim the Tongue Eater, leaving Hugh and the others with no one to trust.\n' +
          '\n' +
          'And if they fail to stop the Tongue Eater, it could mean madness and death for the entire continent.',
        torrent: {
          hash: '6ef58bc338a350ea057cb42d02a5bc28188938dc',
          announceUrl: 'http://tracker.files.fm:6969/announce',
          trackers: [
            'http://tracker.files.fm:6969/announce',
            'http://open.acgnxtracker.com:80/announce',
            'http://tracker2.dler.org:80/announce',
            'udp://exodus.desync.com:6969/announce',
            'udp://open.stealth.si:80/announce',
            'udp://opentor.org:2710/announce',
            'udp://tracker.dler.org:6969/announce',
            'udp://tracker.opentrackr.org:1337/announce',
            'udp://tracker.tiny-vps.com:6969/announce',
            'udp://tracker.torrent.eu.org:451/announce',
            'https://tracker2.ctix.cn:443/announce',
            'https://tracker1.520.jp:443/announce',
            'udp://opentracker.i2p.rocks:6969/announce',
            'udp://open.demonii.com:1337/announce',
            'udp://tracker.openbittorrent.com:6969/announce',
            'http://tracker.openbittorrent.com:80/announce',
            'udp://tracker.moeking.me:6969/announce',
            'udp://explodie.org:6969/announce',
            'http://bt.endpot.com:80/announce',
            'udp://tracker1.bt.moack.co.kr:80/announce',
            'udp://tracker.dump.cl:6969/announce',
            'udp://tracker-udp.gbitt.info:80/announce',
            'udp://tk1.trackerservers.com:8080/announce',
            'udp://p4p.arenabg.com:1337/announce',
            'udp://movies.zsw.ca:6969/announce',
          ],
          magnetUrl:
            'magnet:?xt=urn:btih:6ef58bc338a350ea057cb42d02a5bc28188938dc&dn=The+Last+Echo+of+the+Lord+of+Bells+%28Mage+Errant+%237%29&tr=http%3A%2F%2Ftracker.files.fm%3A6969%2Fannounce&tr=http%3A%2F%2Fopen.acgnxtracker.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker2.dler.org%3A80%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fopentor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=https%3A%2F%2Ftracker2.ctix.cn%3A443%2Fannounce&tr=https%3A%2F%2Ftracker1.520.jp%3A443%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=http%3A%2F%2Fbt.endpot.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker1.bt.moack.co.kr%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.dump.cl%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker-udp.gbitt.info%3A80%2Fannounce&tr=udp%3A%2F%2Ftk1.trackerservers.com%3A8080%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fmovies.zsw.ca%3A6969%2Fannounce',
        },
        related: [
          {
            id: 'rift-magus-reborn-2-rise-of-the-arcane-aristocrat-sam-winton',
            title: 'Rift Magus Reborn 2: Rise of the Arcane Aristocrat',
            authors: ['Sam Winton'],
          },
          {
            id: 'the-healers-way-book-7-oleg-sapphire-alexey-kovtunov',
            title: 'The Healer’s Way, Book 7',
            authors: ['Oleg Sapphire', 'Alexey Kovtunov'],
          },
          {
            id: 'rebel-witch-the-crimson-moth-duology-book-2-kristen-ciccarelli',
            title: 'Rebel Witch: The Crimson Moth Duology, Book 2',
            authors: ['Kristen Ciccarelli'],
          },
          {
            id: 'the-nightward-r-s-a-garcia',
            title: 'The Nightward',
            authors: ['R. S. A. Garcia'],
          },
          {
            id: 'the-city-that-would-eat-the-world-more-gods-than-stars-1-john-bierce',
            title:
              'The City That Would Eat the World (More Gods Than Stars #1)',
            authors: ['John Bierce'],
          },
          {
            id: 'monster-haven-1-6-monster-in-my-closet-pooka-in-my-pantry-fairies-in-my-fireplace-golem-in-my-glovebox-demons-in-my-driveway-phoenix-in-my-fortune-rl-naquin',
            title:
              'Monster Haven [1-6] ( Monster in My Closet, Pooka in My Pantry, Fairies in My Fireplace, Golem in My Glovebox, Demons in My Driveway, Phoenix in My Fortune )',
            authors: ['R.L. Naquin'],
          },
          {
            id: 'forging-silver-into-stars-brigid-kemmerer',
            title: 'Forging Silver into Stars',
            authors: ['Brigid Kemmerer'],
          },
          {
            id: 'live-and-let-lionel-zodiac-academy-book-86-caroline-peckham-susanne-valenti',
            title: 'Live and Let Lionel [Zodiac Academy, Book 8.6]',
            authors: ['Caroline Peckham', 'Susanne Valenti'],
          },
          {
            id: 'this-ends-in-embers-divine-traitors-book-2-kamilah-cole',
            title: 'This Ends in Embers - Divine Traitors - Book 2',
            authors: ['Kamilah Cole'],
          },
          {
            id: 'moonfall-beneath-the-dragoneye-moons-book-13-selkie-myth',
            title: 'Moonfall Beneath the Dragoneye Moons, Book 13',
            authors: ['Selkie Myth'],
          },
          {
            id: 'a-game-of-veils-the-royal-spares-series-book-1-eva-chase',
            title: 'A Game of Veils [The Royal Spares Series, Book 1]',
            authors: ['Eva Chase'],
          },
          {
            id: 'rogue-ascension-book-8-hunter-mythos',
            title: 'Rogue Ascension: Book 8',
            authors: ['Hunter Mythos'],
          },
          {
            id: 'if-you-dont-love-me-we-both-die-part-one-and-two-cm-stunich',
            title: 'If You Don’t Love Me We Both Die: Part One and Two',
            authors: ['C.M. Stunich'],
          },
          {
            id: 'the-in-between-bookstore-edward-underhill',
            title: 'The In-Between Bookstore',
            authors: ['Edward Underhill'],
          },
        ],
      })
    );
  });

  test('Harry Potter 1-7 Read by Stephen Fry Enhanced Edition - J.K. Rowling', async () => {
    const exactId =
      'harry-potter-1-7-read-by-stephen-fry-enhanced-edition-jk-rowling-3';

    const html = await readFile(
      path.join(__dirname, 'html-pages', `${exactId}.html`),
      'utf8'
    );

    const bookUrl = getAudiobookUrl(AUDIOBOOKBAY_URL, exactId);
    const data = parseAudiobook(bookUrl, AUDIOBOOKBAY_URL, html);

    expect(data).toEqual(
      expect.objectContaining({
        id: exactId,
        title: 'Harry Potter 1-7 Read by Stephen Fry Enhanced Edition',
        categories: ['Children', 'Fantasy'],
        language: 'English',
        cover:
          'https://www.therowlinglibrary.com/wp-content/uploads/2022/05/audiobooks-1536x768.jpg',
        authors: ['J.K. Rowling'],
        narrators: ['Stephen Fry'],
        audioSample: null,
        posted: '2025-01-12T05:30:24.000Z',
        specs: {
          format: 'MP3',
          bitrate: '128 Kbps',
          bitrateKbps: 128,
          size: 6914897347,
        },
        abridged: 'Unabridged',
        description:
          'Harry Potter Books 1-7 Complete Bundle\n' +
          '\n' +
          'Broken into Chapters\n' +
          '\n' +
          'Harry Potter and the Philosophers Stone\n' +
          '\n' +
          'Harry Potter and the Chamber of Secrets\n' +
          '\n' +
          'Harry Potter and the Prisoner of Azkaban\n' +
          '\n' +
          'Harry Potter and the Goblet of Fire\n' +
          '\n' +
          'Harry Potter and the Order of the Phoenix\n' +
          '\n' +
          'Harry Potter and the Half-Blood Prince\n' +
          '\n' +
          'Harry Potter and the Deathly Hallows',
        torrent: {
          hash: '6db84024d8f4622545127c337ad3d175ca5eb2e2',
          announceUrl: 'http://bt4.t-ru.org/ann?magnet',
          trackers: [
            'http://bt4.t-ru.org/ann?magnet',
            'http://tracker.files.fm:6969/announce',
            'http://tracker.bt4g.com:2095/announce',
            'http://tracker2.dler.org/announce',
            'udp://exodus.desync.com:6969/announce',
            'udp://open.stealth.si:80/announce',
            'udp://bt1.archive.org:6969/announce',
            'udp://tracker.dler.org:6969/announce',
            'udp://tracker.opentrackr.org:1337/announce',
            'udp://tracker.tiny-vps.com:6969/announce',
            'udp://tracker.torrent.eu.org:451/announce',
            'http://tracker2.dler.org:80/announce',
          ],
          magnetUrl:
            'magnet:?xt=urn:btih:6db84024d8f4622545127c337ad3d175ca5eb2e2&dn=Harry+Potter+1-7+Read+by+Stephen+Fry+Enhanced+Edition&tr=http%3A%2F%2Fbt4.t-ru.org%2Fann%3Fmagnet&tr=http%3A%2F%2Ftracker.files.fm%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.bt4g.com%3A2095%2Fannounce&tr=http%3A%2F%2Ftracker2.dler.org%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fbt1.archive.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=http%3A%2F%2Ftracker2.dler.org%3A80%2Fannounce',
        },
        related: [
          {
            id: 'the-complete-fiction-of-hp-lovecraft-h-p-lovecraft',
            title: 'The Complete Fiction of H.P. Lovecraft',
            authors: ['H. P. Lovecraft'],
          },
          {
            id: 'hdarry-potter-et-les-reliques-de-la-mort-harry-potter-7-francais-jk-rowling',
            title:
              'Harry Potter et les Reliques de la Mort, Harry Potter 7, Français',
            authors: ['J.K. Rowling'],
          },
          {
            id: 'harury-potter-et-le-prince-de-sang-mele-harry-potter-6-francais-jk-rowling',
            title:
              'Harry Potter et le Prince de Sang-Mêlé, Harry Potter 6, Français',
            authors: ['J.K. Rowling'],
          },
          {
            id: 'harryx-potter-et-lordre-du-phenix-harry-potter-5-francais-jk-rowling',
            title:
              'Harry Potter et l’Ordre du Phénix, Harry Potter 5, Français',
            authors: ['J.K. Rowling'],
          },
          {
            id: 'hoarry-potter-et-la-coupe-de-feu-harry-potter-4-francais-jk-rowling',
            title: 'Harry Potter et la Coupe de Feu, Harry Potter 4, Français',
            authors: ['J.K. Rowling'],
          },
          {
            id: 'harryp-potter-et-le-prisonnier-dazkaban-harry-potter-3-francais-jk-rowling',
            title:
              'Harry Potter et le Prisonnier d’Azkaban, Harry Potter 3, Français',
            authors: ['J.K. Rowling'],
          },
          {
            id: 'harrcy-potter-et-la-chambre-des-secrets-harry-potter-2-francais-jk-rowling',
            title:
              'Harry Potter et la Chambre des Secrets, Harry Potter 2, Français',
            authors: ['J.K. Rowling'],
          },
          {
            id: 'hadrry-potter-a-lecole-des-sorciers-harry-potter-1-francais-jk-rowling',
            title:
              'Harry Potter à l’École des Sorciers, Harry Potter 1, Français',
            authors: ['J.K. Rowling'],
          },
          {
            id: 'the-complete-george-smiley-radio-dramas-john-le-carre',
            title: 'The Complete George Smiley Radio Dramas',
            authors: ['John le Carré'],
          },
          {
            id: 'harry-potter-bundle-books-1-7-norsk-jk-rowling',
            title: 'Harry Potter Bundle Books 1-7 Norsk',
            authors: ['J.K. Rowling'],
          },
          {
            id: 'harry-potter-bundle-books-1-7-espanol-jk-rowling',
            title: 'Harry Potter Bundle Books 1-7 Español',
            authors: ['J.K. Rowling'],
          },
          {
            id: 'harry-potter-bundle-books-1-7-deutsch-jk-rowling',
            title: 'Harry Potter Bundle Books 1-7 Deutsch',
            authors: ['J.K. Rowling'],
          },
          {
            id: 'harry-potter-bundle-books-1-7-italiano-jk-rowling-2',
            title: 'Harry Potter Bundle Books 1-7 Italiano',
            authors: ['J.K. Rowling'],
          },
        ],
      })
    );
  });
});
