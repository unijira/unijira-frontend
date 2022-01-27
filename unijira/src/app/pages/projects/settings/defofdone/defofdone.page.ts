import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../models/projects/Project';
import {Subscription} from 'rxjs';
import {SessionService} from '../../../../store/session.service';
import {ProjectService} from '../../../../services/project/project.service';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {PageService} from '../../../../services/page.service';
import {AlertController, ItemReorderEventDetail, ToastController} from '@ionic/angular';
import {DefinitionOfDoneEntry} from '../../../../models/projects/DefinitionOfDoneEntry';
import {presentToast} from '../../../../util';

@Component({
  selector: 'app-defofdone',
  templateUrl: './defofdone.page.html',
  styleUrls: ['./defofdone.page.scss'],
})
export class DefOfDonePage implements OnInit {

  @Input() project: Project;
  @Input() projectSubscription: Subscription;

  defOfDone: DefinitionOfDoneEntry[];

  constructor(private sessionService: SessionService,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private translateService: TranslateService,
              private pageService: PageService,
              private toastController: ToastController,
              private alertController: AlertController
  ) {

    this.pageService.setTitle(['project.pages.settings','project.pages.settings.defOfDone']);

    this.activatedRoute.params.subscribe(params => {

      this.sessionService.loadProject(params.id);

      this.projectSubscription = this.projectService.getProject(params.id).subscribe((p) => {

        this.project = p;

        if(p) {
          this.loadDefOfDone();
        }

      });

    });
  }

  ngOnInit() { }

  loadDefOfDone() {
    this.projectService.getProjectDefOfDone(this.project.id).subscribe((entries) => {
      entries.sort((a, b) => a.priority - b.priority);
      this.defOfDone = entries;
    });
  }

  doReorder(event: CustomEvent<ItemReorderEventDetail>) {
    event.detail.complete(this.defOfDone);

    const target: DefinitionOfDoneEntry = this.defOfDone[event.detail.to];
    target.priority = event.detail.to + 1;
    this.projectService.updateDefOfDoneEntry(this.project.id, target.id, target).subscribe((d) => {
      if(d === null || target.priority !== d.priority) {
        this.loadDefOfDone();
      }
    });
  }

  addEntry() {
    const newEntry: DefinitionOfDoneEntry = new DefinitionOfDoneEntry(null, this.translateService.instant('project.settings.defOfDone.activity'), null, this.project.id);
    this.projectService.createDefOfDoneEntry(this.project.id, newEntry).subscribe((d) => {
      if(d !== null) {
        this.defOfDone.push(d);
      }
      else {
        presentToast(
          this.toastController,
          this.translateService.instant(
            'error.api.default'
          ),
          true
        ).then();
      }
    });
  }

  updateEntry(d: DefinitionOfDoneEntry) {
      this.projectService.updateDefOfDoneEntry(this.project.id, d.id, d).subscribe((r) => {
        console.log(d);
        if(r === null || r.description !== d.description || r.priority !== d.priority) {
          this.loadDefOfDone();
        }
      });
  }

  deleteEntry(d: DefinitionOfDoneEntry) {
    this.showAlert().then((choice) => {
      if(choice) {
        this.projectService.deleteDefOfDoneEntry(this.project.id, d.id).subscribe((r) => {
          if(r === true) {
            this.defOfDone.splice(this.defOfDone.indexOf(d), 1);
          }
          else {
            presentToast(
              this.toastController,
              this.translateService.instant(
                'error.api.default'
              ),
              true
            ).then();
          }
        });
      }
    });
  }

  async showAlert(): Promise<any> {

    return new Promise(async (resolve) => {

      const alert = await this.alertController.create({
        header: this.translateService.instant('project.settings.defOfDone.delete'),
        message: this.translateService.instant('project.settings.defOfDone.delete.msg'),
        buttons: [
          {
            text: this.translateService.instant('project.settings.defOfDone.delete.abort'),
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          }, {
            text: this.translateService.instant('project.settings.defOfDone.delete.confirm'),
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      await alert.present();

    });
  }
}
