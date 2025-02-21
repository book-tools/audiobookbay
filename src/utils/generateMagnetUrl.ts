export const generateMagnetUrl = (
  hash: string | null,
  title: string,
  trackers: string[]
): string | null => {
  if (!hash) {
    return null;
  }

  const searchParams = new URLSearchParams();
  if (title) {
    searchParams.append('dn', title);
  }
  trackers.forEach((tracker) => {
    if (tracker) {
      searchParams.append('tr', tracker);
    }
  });

  return `magnet:?xt=urn:btih:${hash}&${searchParams.toString()}`;
};
