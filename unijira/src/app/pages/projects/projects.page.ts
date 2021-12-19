import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/projects/Project';
import {ProjectService} from '../../services/common/project.service';
import {TimePipe} from '../../pipes/time.pipe';
import {FilteredPipe} from '../../pipes/filtered.pipe';

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
  ) { }


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
