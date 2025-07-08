import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero', 
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  profileImage = 'assets/images/profile.png';

  linkedinUrl = 'https://www.linkedin.com/in/jelle-vandebroek-b00415176/';
  githubUrl = 'https://github.com/Jelle23';
  cvUrl = 'assets/images/CV.pdf';

  linkedinIcon = 'assets/images/linkedin.png';
  githubIcon = 'assets/images/github.png';
  cvIcon = 'assets/images/cv.png';
  
  scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
}
