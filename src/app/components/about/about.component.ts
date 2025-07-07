import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';

interface SkillNode extends d3.SimulationNodeDatum {
  id: string;
  group: string;
}

interface SkillLink extends d3.SimulationLinkDatum<SkillNode> {
  source: string | SkillNode;
  target: string | SkillNode;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {

  constructor(private translate: TranslateService) {}

  private langChangeSub!: Subscription;

  @ViewChild('mindMap', { static: true }) mindMapRef!: ElementRef;

  private skills: SkillNode[] = [
    { id: 'Jelle', group: 'Mezelf' },
    { id: 'Frontend', group: 'Frontend' },
    { id: 'JavaScript', group: 'Frontend' },
    { id: 'HTML', group: 'Frontend' },
    { id: 'CSS', group: 'Frontend' },
    { id: 'Frameworks', group: 'Frameworks' },
    { id: 'Vue', group: 'Frameworks' },
    { id: 'Angular', group: 'Frameworks' },
    { id: 'React', group: 'Frameworks' },
    { id: 'Soft Skills', group: 'Soft Skills' },
    { id: 'Communication', group: 'Soft Skills' },
    { id: 'Flexible', group: 'Soft Skills' },
    { id: 'Adaptability', group: 'Soft Skills' },
    { id: 'Design', group: 'Design' },
    { id: 'Photoshop', group: 'Design' },
    { id: 'Illustrator', group: 'Design' },
    { id: 'Adobe XD', group: 'Design' },
    { id: 'Premiere Pro', group: 'Design' },
    { id: 'Personal', group: 'Personal' },
    { id: 'U6 Coach', group: 'Personal' },
    { id: 'Leeftijd', group: 'Personal' },
    { id: 'Koersel', group: 'Personal' },

  ];

  private links: SkillLink[] = [
    { source: 'Frontend', target: 'Jelle' },
    { source: 'JavaScript', target: 'Frontend' },
    { source: 'HTML', target: 'Frontend' },
    { source: 'CSS', target: 'Frontend' },
    { source: 'Frameworks', target: 'Jelle' },
    { source: 'Vue', target: 'Frameworks' },
    { source: 'Angular', target: 'Frameworks' },
    { source: 'React', target: 'Frameworks' },
    { source: 'Soft Skills', target: 'Jelle' },
    { source: 'Communication', target: 'Soft Skills' },
    { source: 'Flexible', target: 'Soft Skills' },
    { source: 'Adaptability', target: 'Soft Skills' },
    { source: 'Design', target: 'Jelle' },
    { source: 'Photoshop', target: 'Design' },
    { source: 'Illustrator', target: 'Design' },
    { source: 'Adobe XD', target: 'Design' },
    { source: 'Premiere Pro', target: 'Design' },
    { source: 'Personal', target: 'Jelle' },
    { source: 'U6 Coach', target: 'Personal' },
    { source: 'Leeftijd', target: 'Personal' },
    { source: 'Koersel', target: 'Personal' },
  ];

  ngOnInit(): void {
    this.createMindMap();

    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      d3.select(this.mindMapRef.nativeElement).select('svg').remove();
      this.createMindMap();
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  private createMindMap(): void {
    const width = 1200;
    const height = 400;

    const svg = d3
      .select(this.mindMapRef.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const simulation = d3
      .forceSimulation<SkillNode>(this.skills)
      .force(
        'link',
        d3
          .forceLink<SkillNode, SkillLink>(this.links)
          .id((d) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(this.links)
      .join('line')
      .attr('stroke-width', 2);

    const colorMap: Record<string, string> = {
      Mezelf: '#A9DFE1',
      Frontend: '#F9E2AE',
      Frameworks: '#A9CFF2',
      SoftSkills: '#AED785',
      Personal: '#C7B9FF',
      Design: '#F78A95',
    };

    const node = svg
      .append('g')
      .selectAll<SVGCircleElement, SkillNode>('circle')
      .data(this.skills)
      .join('circle')
      .attr('r', 10)
      .attr('fill', (d) => colorMap[d.group] || '#ccc')
      .call(
        d3
          .drag<SVGCircleElement, SkillNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    const label = svg
      .append('g')
      .selectAll('text')
      .data(this.skills)
      .join('text')
      .attr('dx', 12)
      .attr('dy', 4)
      .attr('class', 'skill-label')
      .text((d) => this.translate.instant(`skills.${d.id}`))


    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as SkillNode).x!)
        .attr('y1', (d) => (d.source as SkillNode).y!)
        .attr('x2', (d) => (d.target as SkillNode).x!)
        .attr('y2', (d) => (d.target as SkillNode).y!);

      node
        .attr('cx', (d) => {
          d.x = Math.max(10, Math.min(width - 10, d.x!));
          return d.x!;
        })
        .attr('cy', (d) => {
          d.y = Math.max(10, Math.min(height - 10, d.y!));
          return d.y!;
        });

      label
        .attr('x', (d) => {
          d.x = Math.max(10, Math.min(width - 10, d.x!));
          return d.x!;
        })
        .attr('y', (d) => {
          d.y = Math.max(10, Math.min(height - 10, d.y!));
          return d.y!;
        });
    });
  }
}
