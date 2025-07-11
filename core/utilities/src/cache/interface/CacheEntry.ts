export interface CacheEntry<T> {
  /**
   * data contained in the record
   */
  data: T;
  /**
   * time after which the data will be considered expired and will be deleted when interacted with
   */
  expiresAt: number;
}
