import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Project {
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  modalDescription: string;
  githubUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'projects.portfolio.title',
      description: 'projects.portfolio.description',
      tech: ['Angular', 'HTML', 'CSS', 'TypeScript', 'D3', 'Translation', 'Darkmode'],
      imageUrl: 'assets/images/portfolio.png',
      modalDescription: 'projects.portfolio.modalDescription',
      githubUrl: 'https://github.com/Jelle23/Portfolio.git',
    },
    {
      title: 'projects.expense-tracker.title',
      description: 'projects.expense-tracker.description',
      tech: ['Angular', 'TypeScript', 'HTML', 'CSS', 'LocalStorage'],
      imageUrl: 'assets/images/expense-tracker.png', 
      modalDescription: 'projects.expense-tracker.modalDescription',
      githubUrl: 'https://github.com/Jelle23/Expense-Tracker.git',
    },
    {
      title: 'projects.U6-Trainer.title',     
      description: 'projects.U6-Trainer.description',
      tech: ['Angular', 'TypeScript', 'HTML', 'CSS', 'LocalStorage'],
      imageUrl: 'assets/images/U6-trainer.png',
      modalDescription: 'projects.U6-Trainer.modalDescription',
      githubUrl: 'https://github.com/Jelle23/U6-Trainer.git',
    },
    {
      title: 'projects.Graduaatsproef.title',
      description: 'projects.Graduaatsproef.description',
      tech: ['Blazor Server', 'Radzen', 'Google Maps', 'REST API'],
      imageUrl: 'assets/images/graduaatsproef.png',
      modalDescription: 'projects.Graduaatsproef.modalDescription',
      githubUrl: 'https://github.com/Jelle23/Graduaatsproef.git',
    },
    {
      title: 'projects.GreenSpoon.title',
      description: 'projects.GreenSpoon.description',
      tech: ["Vue.js", "JavaScript", "HTML", "CSS", "Axios", "MockAPI", "Google Maps Embed"],
      imageUrl: 'assets/images/TheGreenSpoon.png',
      modalDescription: 'projects.GreenSpoon.modalDescription',
      githubUrl: 'https://github.com/Jelle23/TheGreenSpoon.git',
    },
 ];

  selectedProject: Project | null = null;

  openModal(project: Project) {
    this.selectedProject = project;
  }

  closeModal() {
    this.selectedProject = null;
  }
}