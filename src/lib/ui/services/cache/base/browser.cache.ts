export abstract class BrowserCache<T> {
  public abstract get key(): string;
  public abstract get storage(): Storage;

  constructor(defaultCache?: T) {
    if (defaultCache && this.get() === null) {
      this.set(defaultCache);
    }
  }

  public set(cache: T): T {
    this.storage.setItem(this.key, JSON.stringify(cache));
    return cache;
  }

  public get(): T | null {
    const cache = this.storage.getItem(this.key);
    if (cache) {
      return JSON.parse(cache);
    }
    return null;
  }
}
