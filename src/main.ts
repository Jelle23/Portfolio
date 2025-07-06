// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// ✅ Check theme before bootstrapping
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.body.classList.toggle('dark-mode', savedTheme === 'dark');
} else {
  // Default to dark mode if no preference saved
  document.body.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark');
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
