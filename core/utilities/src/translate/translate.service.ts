import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { cacheService } from '../cache/cache.service'; // adjust the path accordingly

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private translations: Record<string, any> = {};
  private lang = new BehaviorSubject<string | null>(null);

  public lang$ = this.lang.asObservable().pipe(filter((l): l is string => !!l));
  public currentLang: string | null = null;
  public defaultLanguage: string = 'en';
  public availableLanguages: string[] = ['en'];

  private readonly cacheKey = 'preferred_language';

  async init(config: { default: string; supported: string[] }) {
    this.defaultLanguage = config.default;
    this.availableLanguages = config.supported;

    const cachedLang = cacheService.storage<string>(this.cacheKey, true);
    const langToUse =
      cachedLang && this.availableLanguages.includes(cachedLang)
        ? cachedLang
        : this.defaultLanguage;

    await this.setLang(langToUse);
  }

  async setLang(lang: string): Promise<void> {
    const res = await fetch(`/assets/i18n/${lang}.json`);
    this.translations = await res.json();
    this.currentLang = lang;
    this.lang.next(lang);

    // ✅ Save language preference in localStorage
    cacheService.storage(
      this.cacheKey,
      true,
      lang,
      cacheService.getTtl('month')
    );
  }

  translate(key: string, params?: Record<string, any>): string {
    let value = this.deepGet(this.translations, key);
    if (typeof value !== 'string') return `⛔${key}`;
    if (params) {
      for (const paramKey of Object.keys(params)) {
        value = value.replace(
          new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'),
          params[paramKey]
        );
      }
    }
    return value;
  }

  private deepGet(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => o?.[p], obj);
  }
}
