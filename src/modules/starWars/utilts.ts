export const getCacheKey = (page: number, search: string) =>
  `people-page-${page}-search-${search}`;

export const saveToCache = (key: string, data: any) => {
  const cacheEntry = {
    timestamp: new Date().getTime(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
};

export const getFromCache = (key: string) => {
  const cacheEntry = localStorage.getItem(key);
  if (!cacheEntry) return null;

  const { timestamp, data } = JSON.parse(cacheEntry);
  const now = new Date().getTime();
  const cacheDuration = 5 * 60 * 1000;

  if (now - timestamp < cacheDuration) {
    return data;
  }

  localStorage.removeItem(key);
  return null;
};
