import cheerio from "cheerio";
import fetch from "node-fetch";

import { AudioBook } from "@interface/audiobook";

export default async (audiobook: string) => {
  try {
    const url = encodeURI(`http://audiobookbay.se/audio-books/${audiobook}/`);
    const request = await fetch(url);
    const results = await request.text();
    const $ = cheerio.load(results);

    // Title
    const title = $(".postTitle h1").text();

    // Category
    const category: string[] = [];
    $(".postInfo a").each((index, el) => {
      if ($(el).attr("rel") === "category tag") {
        category.push($(el).text());
      }
    });

    // Language
    const lang = $('.postInfo a span[itemprop="inLanguage"]').text();

    // Cover
    let cover: string | undefined;
    const coverUrl = $(".postContent")
      .find('img[itemprop="thumbnailUrl"]')
      .attr("src");

    if (coverUrl === "/images/default_cover.jpg") {
      cover = "http://audiobookbay.se" + coverUrl;
    } else {
      cover = coverUrl;
    }

    const descEl = $(".desc");

    // Author/s
    const author = descEl.find('span[class="author"]').text();

    // Voice Actor Name
    const read = descEl.find('span[class="narrator"]').text();

    // Audio Sample in MP3
    let audioSample;
    if (results.search("<audio") !== -1) {
      audioSample = $(`audio`).attr("src");
    }

    // Format
    const format = descEl.find('span[class="format"]').text();

    // Bitrate
    const bitrate = descEl.find('span[class="bitrate"]').text();

    // Abridged
    const abridged = descEl.find('span[class="is_abridged"]').text();

    // Description
    const description = descEl.find("p:not(:first-child)").text();

    // Torrent Size
    const size = $(
      ".postContent table tr:nth-last-child(11) td:last-child"
    ).text();

    // Tracker, Torrent Hash
    const trackers: string[] = [];
    let hash: string | undefined;

    $(".postContent table tr").each((index, element) => {
      const tdFirst = $(element).find("td:first-child");
      const tdSecond = $(element).find("td:last-child");

      switch (tdFirst.text()) {
        case "Tracker:":
          trackers.push(tdSecond.text());
          break;

        case "Info Hash:":
          hash = tdSecond.text();
          break;

        default:
          break;
      }
    });

    const related: {
      title: string;
      url: string | undefined;
    }[] = [];

    $(`#rsidebar ul li`).each((index, element) => {
      if ($(element).find("h2").text().includes("Related")) {
        $(element)
          .find("ul li")
          .each((_, relatedEl) => {
            const linkEl = $(relatedEl).find("a");

            const title = linkEl.text();

            let url;
            let urlEl = linkEl.attr("href");

            if (urlEl) {
              url = urlEl.replace("/audio-books/", "").replace("/", "");

              related.push({
                title,
                url,
              });
            }
          });
      }
    });

    const data: AudioBook = {
      title,
      category,
      lang,
      cover,
      author,
      read,
      audioSample,
      specs: {
        format,
        bitrate,
      },
      abridged,
      description,
      torrent: {
        hash,
        trackers,
        size,
      },
      related,
    };

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: `Audiobook does not exist's`,
    };
  }
};
