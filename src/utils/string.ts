import { convert as convertHtmlToText } from 'html-to-text';

/**
 * If there are 2 or more spaces in a row, replace them with a single space
 * and trim any leading and trailing spaces
 *
 * @param str - An input string
 * @returns The cleaned string
 */
export const removeExtraSpaces = (str: string): string =>
  str.replace(/\s{2,}/g, ' ').trim();

export const cleanDescription = (description: string) => {
  if (!description) {
    return null;
  }

  let desc = convertHtmlToText(description, { wordwrap: false });

  // Remove any no-break spaces
  desc = desc.replace(/\u00a0+/g, '');
  // Repace any instances of 3 or more newline characters with 2 newline characters
  desc = desc.replace(/\n{3,}/g, '\n\n');
  // Replace the start of any unordered list items with a bullet character
  desc = desc.replace(/\n( +)\* /g, '\n$1• ');
  // Replace any ellipses characters with three periods
  desc = desc.replace(/\u2026/g, '...');
  // Replace any extra long ellipses with 3 periods
  desc = desc.replace(/\.{3,}/g, '...');
  // Remove any leading or trailing spaces
  desc = desc.trim();

  return desc;
};
