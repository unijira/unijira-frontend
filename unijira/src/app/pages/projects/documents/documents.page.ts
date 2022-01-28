import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../../store/session.service';
import {ActivatedRoute} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {PageService} from '../../../services/page.service';
import {ProjectService} from '../../../services/project/project.service';
import {Subscription} from 'rxjs';
import {UserInfo} from '../../../models/users/UserInfo';
import {Document} from '../../../models/projects/Document';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  projectSubscription: Subscription;
  projectId: number;

  userInfoSubscription: Subscription;
  userInfo: UserInfo;

  filterSearch = '';
  filterMimes: Set<string> = new Set();

  documents: Document[] = null;
  files: File[] = [];

  constructor(
    private projectService: ProjectService,
    private pageService: PageService,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private translateService: TranslateService
  ) {

    this.pageService.setTitle('projects.documents.title');

  }

  get filteredDocuments() {
    return this.documents;
  }

  ngOnInit() {

    this.userInfoSubscription = this.sessionService.getUserInfo().subscribe(info => {

      if(!this.userInfo) {
        this.userInfo = info;
      }

    });

    this.activatedRoute.params.subscribe(params => {

      this.sessionService.loadProject(params.id);

      this.projectSubscription = this.projectService.getProject(params.id).subscribe((p) => {

        this.projectId = p.id;

        if(p) {

          this.projectService.getDocuments(p.id).subscribe(d => {

            if(d) {

              this.documents = d;
              this.filterMimes = new Set((this.documents || []).map(e => e.mime));

            }

          });

        }

      });

    });


  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  load() {
  }

}
