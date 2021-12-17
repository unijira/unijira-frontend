import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../models/projects/Project';
import {ProjectService} from '../../services/common/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @Input() recentProjects: Array<Project> = null;
  @Input() myTicketsOpenCount = 0;
  @Input() myTicketsDoneCount = 0;
  @Input() currentSegment = 'open';

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    this.projectService.getRecentProjects(5).subscribe(
      (projects: Array<Project>) => {
        this.recentProjects = projects;
      }
    );
  }

  onSegmentChanged(e: CustomEvent) {
    this.currentSegment = e.detail?.value;
  }
}
