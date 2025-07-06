import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activeSection: string = 'home';
  isDarkMode = true;
  currentLang = '';
  availableLanguages: string[] = [];

   constructor(private languageService: LanguageService) {
    this.availableLanguages = this.languageService.getAvailableLanguages();
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['home', 'about', 'experience', 'projects', 'contact'];
    const scrollPos = window.scrollY + 100; // offset for header height

    for (const section of sections) {
      const elem = document.getElementById(section);
      if (elem) {
        const offsetTop = elem.offsetTop;
        const offsetHeight = elem.offsetHeight;
        if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.switchLang(selectElement.value);
  }

  switchLang(lang: string) {
    this.languageService.setLanguage(lang);
    this.currentLang = lang;
  }
}
