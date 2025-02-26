export interface ToolCache<K, V> {
  get(key: K): V | undefined;
  put(key: K, value: V): void;
}

export class LRU<K, V> implements ToolCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;
  private usage: Map<K, number>;
  private timestamp: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<K, V>();
    this.usage = new Map<K, number>();
    this.timestamp = 0;
  }

  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      // Update the usage timestamp for this key
      this.usage.set(key, ++this.timestamp);
      return this.cache.get(key);
    }
    return undefined;
  }

  put(key: K, value: V): void {
    if (this.cache.size >= this.capacity && !this.cache.has(key)) {
      // Cache is full and this is a new key, remove the least recently used item
      const lruKey = this.findLRUKey();
      if (lruKey) {
        this.cache.delete(lruKey);
        this.usage.delete(lruKey);
      }
    }

    // Add or update the key-value pair
    this.cache.set(key, value);
    this.usage.set(key, ++this.timestamp);
  }

  private findLRUKey(): K | undefined {
    let lruKey: K | undefined;
    let lruTimestamp = Infinity;

    for (const [key, timestamp] of this.usage.entries()) {
      if (timestamp < lruTimestamp) {
        lruKey = key;
        lruTimestamp = timestamp;
      }
    }

    return lruKey;
  }

  // Additional helper methods
  size(): number {
    return this.cache.size;
  }

  clear(): void {
    this.cache.clear();
    this.usage.clear();
    this.timestamp = 0;
  }

  keys(): IterableIterator<K> {
    return this.cache.keys();
  }

  values(): IterableIterator<V> {
    return this.cache.values();
  }
}
