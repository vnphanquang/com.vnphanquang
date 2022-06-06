import { BrowserCache } from './base/browser.cache';

export class TestimonialCardPositionCache extends BrowserCache<{
  left: number;
  top: number;
}> {
  get key(): string {
    return 'testimonial-card-position';
  }

  get storage(): Storage {
    return localStorage;
  }
}
