import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface TimelineEvent {
  date: string;
  title: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  timelineEvents: TimelineEvent[] = [
    { date: "2016", title: "Robots met Arduino" },
    { date: "2018", title: "Functies in Excel" },
    { date: "2019", title: "Programmeren in C#" },
    { date: "2020", title: "HTML, CSS en JS" },
    { date: "2021", title: "Start op PXL" },
    { date: "2022", title: "Vue, Wordpress en PHP" },
    { date: "2024", title: "Angular tijdens stage" },
  ];

  isDragging = false;
  dragStartX = 0;
  scrollLeft = 0;

  @ViewChild('timelineWrapper', { static: true }) timelineWrapper!: ElementRef<HTMLDivElement>;

  calculatePosition(index: number): string {
    const totalEvents = this.timelineEvents.length;
    if (totalEvents <= 1) return '0%';
    return `${(index / (totalEvents - 1)) * 2000}px`;
  }

  scrollTimeline(amount: number): void {
    const timeline = this.timelineWrapper.nativeElement;
    timeline.scrollLeft += amount;
  }

  startDragging(event: MouseEvent): void {
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.scrollLeft = this.timelineWrapper.nativeElement.scrollLeft;
    this.timelineWrapper.nativeElement.style.cursor = 'grabbing';
  }

  onDrag(event: MouseEvent): void {
    if (!this.isDragging) return;
    const dx = event.clientX - this.dragStartX;
    this.timelineWrapper.nativeElement.scrollLeft = this.scrollLeft - dx;
  }

  stopDragging(): void {
    this.isDragging = false;
    this.timelineWrapper.nativeElement.style.cursor = 'grab';
  }

  // Optional: Support touch events for mobile
  startTouch(event: TouchEvent): void {
    this.isDragging = true;
    this.dragStartX = event.touches[0].clientX;
    this.scrollLeft = this.timelineWrapper.nativeElement.scrollLeft;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    const dx = event.touches[0].clientX - this.dragStartX;
    this.timelineWrapper.nativeElement.scrollLeft = this.scrollLeft - dx;
  }

  stopTouch(): void {
    this.isDragging = false;
  }
}
