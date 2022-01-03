import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/projects/Project';
import {ProjectService} from '../../services/common/project.service';
import {PageService} from 'src/app/services/page.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  searchTerm: string;
  projects: Array<Project> = null;

  constructor(
    private projectService: ProjectService,
    private pageService: PageService
  ) {
    this.pageService.setTitle('user.projects.title');
  }


  get filteredProjects() {
    if (!this.searchTerm) {
      return this.projects;
    }
    return this.projects.filter(project => project.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }


  ngOnInit() {
    this.moreProjects();
  }

  moreProjects() {
    this.projectService.getProjects(this.projects?.length || 0, 10).subscribe(
      (projects: Array<Project>) => {
        this.projects = this.projects ? this.projects.concat(projects) : projects;
      }
    );
  }

}
