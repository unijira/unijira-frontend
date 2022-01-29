import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../store/session.service';
import {ActivatedRoute} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {PageService} from '../../../services/page.service';
import {ProjectService} from '../../../services/project/project.service';
import {forkJoin, Subscription, switchMap} from 'rxjs';
import {UserInfo} from '../../../models/users/UserInfo';
import {Document} from '../../../models/projects/Document';
import {BasePath, FileUploadService} from '../../../services/file-upload/file-upload.service';
import {UserService} from '../../../services/user/user.service';

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
  filterMimes: string[] = [];

  documents: Document[] = null;
  mimes: string[] = null;
  files: File[] = [];

  uploading = false;

  constructor(
    private projectService: ProjectService,
    private pageService: PageService,
    private userService: UserService,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private translateService: TranslateService,
    private uploadService: FileUploadService,
    private toastController: ToastController
  ) {

    this.pageService.setTitle('projects.documents.title');

  }

  get filteredDocuments() {

    return this.documents?.filter(d => (
      (this.filterSearch === ''       || d.filename.toLowerCase().includes(this.filterSearch.toLowerCase())
        || d.mime.toLowerCase().includes(this.filterSearch.toLowerCase())) &&
      (this.filterMimes.length === 0 || this.filterMimes.includes(d.mime))
    ));

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
              this.mimes = [...new Set((this.documents || []).map(e => e.mime))];

              this.documents.forEach(doc => {

                this.userService.getUser(doc.userId).subscribe(user => {

                  doc.userAvatar = user.avatar;
                  console.log(doc.userAvatar);

                });

              });

            }

          });

        }

      });

    });


  }

  onSelect(event) {
    console.log(this.documents);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  color(mime: string) {
    return `hsl(${[...mime].reduce((a, b) => b.charCodeAt(0) + ((a * 64) - a), 0)}, 95%, 35%)`;
  }

  load() {

    this.showAlert(this.translateService.instant('projects.documents.alert.title'),
      this.translateService.instant('projects.documents.alert.sure'),
      this.translateService.instant('wizard.alert.message.button.cancel'),
      this.translateService.instant('wizard.alert.message.button.confirm'))
      .then(res => {

        if (res) {

          this.uploading = true;

          forkJoin([...this.files.map(f =>

            this.uploadService.upload(this.projectId, 'document', f, BasePath.project).pipe(switchMap(
              url => this.projectService.createDocument(f.name, new URL(url), this.projectId, this.userInfo.id, this.userInfo.firstName,
                this.userInfo.lastName, this.userInfo.username, this.userInfo.avatar, f.type))
            )

          )]).subscribe(i => {

            if(i) {

              this.files = [];

              this.projectService.getDocuments(this.projectId).subscribe(d => {

                if(d) {
                  this.documents = d;
                  this.mimes = [...new Set((this.documents || []).map(e => e.mime))];
                }

              });

              this.uploading = false;

              this.presentToast(this.translateService.instant('projects.documents.toast.success'), 'success', 'checkmark-circle-outline').then();
            } else {
              this.presentToast(this.translateService.instant('projects.documents.toast.failed'), 'danger', 'alert-circle-outline').then();
            }

          });

        }

      });

  }

  remove(d: Document) {

    this.showAlert(this.translateService.instant('projects.documents.delete.alert.title'),
      this.translateService.instant('projects.documents.delete.alert.sure'),
      this.translateService.instant('wizard.alert.message.button.cancel'),
      this.translateService.instant('wizard.alert.message.button.confirm'))
      .then(res => {

        if (res) {

          this.projectService.deleteDocument(this.projectId, d.id).subscribe( i => {

            if(i === null) {

              this.files = [];

              this.projectService.getDocuments(this.projectId).subscribe(k => {

                if(d) {
                  this.documents = k;
                  this.mimes = [...new Set((this.documents || []).map(e => e.mime))];
                }

              });

              this.presentToast(this.translateService.instant('projects.documents.delete.toast.success'), 'success', 'checkmark-circle-outline').then();

            } else {
              this.presentToast(this.translateService.instant('projects.documents.delete.toast.failed'), 'danger', 'alert-circle-outline').then();
            }

          });

        }

      });

  }

  async presentToast(message: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 4000,
      color,
      icon
    });
    await toast.present();
  }

  async showAlert(header: string, message: string, cancel: string, confirm: string): Promise<any> {

    return new Promise(async (resolve) => {

      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: cancel,
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          }, {
            text: confirm,
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
