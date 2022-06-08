import { BrowserCache } from './base/browser.cache';

export interface TableOfContentsSettingsCacheData {
  closeOnLinkClick: boolean;
}

export class TableOfContentsSettingsCache extends BrowserCache<TableOfContentsSettingsCacheData> {
  public defaultCache: TableOfContentsSettingsCacheData;

  constructor() {
    const defaultCache: TableOfContentsSettingsCacheData = {
      closeOnLinkClick: false,
    };
    super(defaultCache);
    this.defaultCache = defaultCache;
  }

  public get key() {
    return 'table-of-contents-settings';
  }

  public get storage() {
    return localStorage;
  }

  public getCloseOnLinkClick() {
    const cache = this.get() ?? this.defaultCache;
    return cache.closeOnLinkClick;
  }
  public setCloseOnLinkClick(closeOnLinkClick: boolean) {
    const cache = this.get() ?? this.defaultCache;
    this.set({ ...cache, closeOnLinkClick })
  }
}
