import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private defaultLang = 'en';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'nl']);

    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLang = localStorage.getItem('lang');
      const browserLang = translate.getBrowserLang();

      const langToUse =
        savedLang || (browserLang?.startsWith('nl') ? 'nl' : this.defaultLang);
      this.setLanguage(langToUse);
    } else {
      // fallback if localStorage is not available (SSR)
      this.setLanguage(this.defaultLang);
    }
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('lang', lang);
    }
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.defaultLang;
  }

  getAvailableLanguages(): string[] {
    return this.translate.getLangs();
  }
}
