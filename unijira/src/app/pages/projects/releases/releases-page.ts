import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../services/page.service';
import {SessionService} from '../../../store/session.service';
import {ActivatedRoute} from '@angular/router';
import {ReleaseStatus} from '../../../models/releases/ReleaseStatus';
import {ReleaseService} from '../../../services/release/release.service';
import {Release} from '../../../models/releases/Release';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.page.html',
  styleUrls: ['./releases.page.scss'],
})
export class ReleasesPage implements OnInit {

  projectId: number;

  filterSearch = '';
  filterStatus: ReleaseStatus[] = [];

  releaseStatus = ReleaseStatus;
  releases: Release[] = null;


  constructor(
    private pageService: PageService,
    private sessionService: SessionService,
    private releaseService: ReleaseService,
    private activatedRoute: ActivatedRoute,
  ) {

    pageService.setTitle('projects.releases.title');

    this.filterStatus = [
      ReleaseStatus.draft,
      ReleaseStatus.released,
      ReleaseStatus.archived,
    ];

  }


  get filteredReleases() {
    return this.releases?.filter(release => (
      (this.filterSearch === ''       || release.version.toLowerCase().includes(this.filterSearch.toLowerCase())
                                      || release.description.toLowerCase().includes(this.filterSearch.toLowerCase())) &&
      (this.filterStatus.length === 0 || this.filterStatus.includes(release.status))
    )) || [];
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      this.projectId = params.id;
      this.sessionService.loadProject(params.id);

      this.releaseService.getReleases(this.projectId).subscribe(releases => {
        this.releases = releases;
      });

    });

  }

  export() {

    let csv = '';
    csv += Object.keys(this.releases[0]).join(';') + '\n';
    csv += Object.values(this.filteredReleases).map(ticket => Object.values(ticket).join(';')).join('\n');

    const blob = new Blob([csv], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'releases.csv');
    a.click();

  }

}
