import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../services/page.service';
import {SessionService} from '../../../store/session.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-release',
  templateUrl: './releases.page.html',
  styleUrls: ['./releases.page.scss'],
})
export class ReleasesPage implements OnInit {

  projectId: number;

  constructor(
    private pageService: PageService,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
  ) {

    pageService.setTitle('projects.releases.title');

    activatedRoute.params.subscribe(params => {
      this.projectId = params.id;
      this.sessionService.loadProject(params.id);
    });

  }

  ngOnInit() {
  }

}
