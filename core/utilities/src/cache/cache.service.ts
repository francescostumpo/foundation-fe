import type { CacheEntry } from './interface/CacheEntry';

export const cacheService = (() => {
  /**
   * Clean entire cache from localStorage or sessionStorage
   */
  function clean(isPersistent: boolean): void {
    getStorage(isPersistent).clear();
  }

  /**
   * Manage items in cache
   * @param name key name to store
   * @param isPersistent localStorage if true, else sessionStorage
   * @param data optional data to store (if not provided, tries to retrieve)
   * @param ttl optional TTL in seconds
   * @returns cached data or undefined
   */
  function storage<T>(
    name: string,
    isPersistent: boolean,
    data?: T,
    ttl?: number
  ): T | undefined {
    if (data !== undefined) {
      setItem(name, isPersistent, data, ttl);
      return data;
    }

    const cachedResult = getItem<T>(name, isPersistent);
    if (!cachedResult) {
      deleteItem(name, isPersistent);
      return undefined;
    }
    return cachedResult.data;
  }

  /**
   * Set item in storage with expiration
   */
  function setItem<T>(
    name: string,
    isPersistent: boolean,
    data: T,
    ttl?: number
  ): void {
    if (typeof window === 'undefined') return;

    const expiration = ttl
      ? Date.now() + ttl * 1000
      : Date.now() + getTtl('hour') * 1000;

    const cacheEntry: CacheEntry<T> = {
      data,
      expiresAt: expiration,
    };
    getStorage(isPersistent).setItem(name, JSON.stringify(cacheEntry));
  }

  /**
   * Get item from storage and parse JSON
   */
  function getItem<T>(
    name: string,
    isPersistent: boolean
  ): CacheEntry<T> | undefined {
    if (typeof window === 'undefined') return undefined;

    try {
      const storage = getStorage(isPersistent);
      const item = storage.getItem(name);
      if (!item) return undefined;

      const parsed: CacheEntry<T> = JSON.parse(item);
      if (itemExpired(parsed)) {
        storage.removeItem(name);
        return undefined;
      }
      return parsed;
    } catch {
      return undefined;
    }
  }

  /**
   * Delete item from storage
   */
  function deleteItem(name: string, isPersistent: boolean): void {
    if (typeof window === 'undefined') return;
    getStorage(isPersistent).removeItem(name);
  }

  /**
   * Delete items by key filter substring
   */
  function deleteItemsByKeyFilter(filter: string, isPersistent: boolean): void {
    if (typeof window === 'undefined') return;

    const storage = getStorage(isPersistent);
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key && key.includes(filter)) {
        storage.removeItem(key);
      }
    }
  }

  /**
   * Check if cache entry expired
   */
  function itemExpired<T>(cacheEntry: CacheEntry<T>): boolean {
    return Date.now() > cacheEntry.expiresAt;
  }

  /**
   * Get storage instance
   */
  function getStorage(isPersistent: boolean): Storage {
    return isPersistent ? localStorage : sessionStorage;
  }

  /**
   * Get TTL in seconds by type
   */
  function getTtl(
    timeType: 'day' | 'month' | 'year' | 'hour' | 'half'
  ): number {
    const hour = 3600;
    switch (timeType) {
      case 'year':
        return 365 * 24 * hour;
      case 'month':
        return 30 * 24 * hour;
      case 'day':
        return 24 * hour;
      case 'half':
        return hour / 2;
      default:
        return hour;
    }
  }

  return {
    clean,
    storage,
    deleteItem,
    deleteItemsByKeyFilter,
    getTtl,
  };
})();
