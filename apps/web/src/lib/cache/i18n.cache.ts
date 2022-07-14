import { BrowserCache } from './base/browser.cache';

export interface I18NCacheData {
  userSwitchedOnce: boolean;
}

export class I18NCache extends BrowserCache<I18NCacheData> {
  public defaultCache: I18NCacheData;

  constructor() {
    const defaultCache: I18NCacheData = {
      userSwitchedOnce: false,
    };
    super(defaultCache);
    this.defaultCache = defaultCache;
  }

  get key(): string {
    return 'i18n';
  }
  get storage(): Storage {
    return sessionStorage;
  }

  public getUserSwitchedOnce(): boolean {
    const cache = this.get() ?? this.defaultCache;
    return cache.userSwitchedOnce;
  }

  public setUserSwitchedOnce(userSwitchedOnce: boolean): boolean {
    const cache = this.get() ?? this.defaultCache;
    this.set({
      ...cache,
      userSwitchedOnce,
    });
    return userSwitchedOnce;
  }
}
