import filesizeParser from 'filesize-parser';
import { removeExtraSpaces } from './string';

export const cleanString = (str: string | null | undefined): string => {
  if (!str) {
    return '';
  }

  // Remove any leading/trailing whitespace
  let cleanedStr = str.trim();

  // Remove any instances of multiple spaces in a row
  cleanedStr = removeExtraSpaces(cleanedStr);

  return cleanedStr;
};

interface TitleAuthor {
  title: string;
  authors: string[];
}

export const parseTitleAuthor = (fullTitle: string): TitleAuthor => {
  const titleArr = fullTitle.split(' - ');

  const authors =
    titleArr
      .pop()
      ?.split(',')
      .map((author) => cleanString(author)) ?? [];

  const title = cleanString(titleArr.join(' - '));

  return { title, authors };
};

export const parseCoverUrl = (
  baseUrl: string,
  coverSrc: string | undefined
): string | null => {
  if (!coverSrc) {
    return null;
  }

  const trimmedCoverSrc = coverSrc.trim();

  if (trimmedCoverSrc === '/images/default_cover.jpg') {
    return baseUrl + trimmedCoverSrc;
  }

  // Simplify cover URLs from Amazon (and Audible) for a potential increase in resolution
  const amazonCoverSizeRegex = /\._SL\d+_/;
  if (amazonCoverSizeRegex.test(trimmedCoverSrc)) {
    return trimmedCoverSrc.replace(amazonCoverSizeRegex, '');
  }

  return trimmedCoverSrc;
};

interface ParsedBitrate {
  bitrate: string | null;
  bitrateKbps: number | null;
}

/**
 * Parse a string representing a bitrate into both a string and a number representing the bitrate in Kbps
 *
 * @param bitrate - Bitrate string
 * @returns a string `bitrate` and a number `bitrateKbps` or null for each if the bitrate is not available
 */
export const parseBitrate = (bitrate: string | undefined): ParsedBitrate => {
  if (!bitrate || bitrate.trim() === '?') {
    return {
      bitrate: null,
      bitrateKbps: null,
    };
  }

  const outBitrate: ParsedBitrate = {
    bitrate: bitrate.trim(),
    bitrateKbps: null,
  };

  const bitrateNumStr = bitrate.replace(/[^0-9.]/g, '');
  if (bitrateNumStr) {
    const bitrateKbps = Number(bitrateNumStr);
    if (!Number.isNaN(bitrateKbps)) {
      outBitrate.bitrateKbps = bitrateKbps;
    }
  }

  return outBitrate;
};

/**
 * Parse a string representing a file size into a number of bytes
 *
 * @param size - File size string
 * @returns A number representing the file size or null if the file size is invalid
 */
export const parseFileSize = (size: string | undefined): number | null => {
  if (!size) {
    return null;
  }

  // Remove trailing 's' to allow filesize-parser to parse
  const trimmedSize = size.replace(/s$/, '');

  try {
    const fileSize = filesizeParser(trimmedSize);
    return fileSize;
  } catch (_err) {
    return null;
  }
};

/**
 * Parse a string representing a date into ISO 8601 format
 *
 * @param dateStr - A string representing a date
 * @returns An ISO 8601 date string or null if the date is invalid
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601}
 */
export const parseDate = (dateStr: string | undefined): string | null => {
  if (!dateStr) {
    return null;
  }

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
};

export const parseUrlSlug = (url: string): string => {
  const urlPathArr = url.split('/').filter(Boolean);
  return urlPathArr[urlPathArr.length - 1];
};

export const parseFormat = (format: string | undefined): string | null => {
  if (!format) {
    return null;
  }

  const trimmedFormat = format.trim();

  if (trimmedFormat === '?') {
    return null;
  }

  return trimmedFormat.toUpperCase();
};
