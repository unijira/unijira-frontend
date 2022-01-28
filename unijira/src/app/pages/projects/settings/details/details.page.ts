import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../models/projects/Project';
import {Subscription} from 'rxjs';
import {SessionService} from '../../../../store/session.service';
import {FormControl, Validators} from '@angular/forms';
import {AlertController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {PageService} from '../../../../services/page.service';
import {BasePath, FileUploadService} from '../../../../services/file-upload/file-upload.service';
import {ProjectService} from '../../../../services/project/project.service';
import {Membership} from '../../../../models/projects/Membership';
import {UserInfo} from '../../../../models/users/UserInfo';
import {MembershipPermission} from '../../../../models/projects/MembershipPermission';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  @Input() file: File;
  @Input() image: string;

  @Input() project: Project;
  @Input() projectSubscription: Subscription;

  @Input() saved = false;

  nameForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  keyForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  userInfoSubscription: Subscription;
  userInfo: UserInfo;

  membership: Membership;
  membershipPermission = MembershipPermission;

  constructor(private sessionService: SessionService,
              public alertController: AlertController,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private translateService: TranslateService,
              private uploadService: FileUploadService,
              private router: Router,
              public toastController: ToastController,
              private pageService: PageService) {

    this.pageService.setTitle(['project.pages.settings','project.pages.settings.details']);

    this.userInfoSubscription = sessionService.getUserInfo().subscribe(info => {

      if(!this.userInfo) {
        this.userInfo = info;
      }

    });

    this.projectSubscription = this.sessionService.getProject().subscribe((p) => {

      this.project = p;

      if(p) {

        this.nameForm.setValue(this.project && this.project.name);
        this.keyForm.setValue(this.project && this.project.key);

        this.projectService.getMemberships(p.id).subscribe(
          members => {

            members.forEach(member => {

                if (member.keyUserId === this.userInfo.id) {
                  this.membership = member;
                }

            });

          }
        );

      }

   });

    this.activatedRoute.params.subscribe(params => this.sessionService.loadProject(params.id));

  }

  ngOnInit() {
    this.image = '';
    this.nameForm.setValue(this.project && this.project.name);
    this.keyForm.setValue(this.project && this.project.key);
  }

  onChangeTime() {

    if(this.nameForm.value.length >= 3) {

      let name = this.nameForm.value;
      name = name.replace(/\s+/g, '');
      const len = name.length;

      this.keyForm.setValue([name[0],
        name[len % 2 ? Math.floor(len / 2) : Math.floor(len / 2)],
        name[len - 1]]
        .join('').toUpperCase());

    } else {
      this.keyForm.setValue('');
    }

  }

  onFileChanged(event) {

    const reader = new FileReader();

    this.file = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (e) => {
      this.image = e.target.result as string;
    };

    event.target.value = null;

  }

  save() {

    this.showAlert(this.translateService.instant('project.settings.details.alert.update.title'),
      this.translateService.instant('project.settings.details.alert.update.message.sure'),
      this.translateService.instant('wizard.alert.message.button.cancel'),
      this.translateService.instant('wizard.alert.message.button.confirm'))
      .then(res => {

        if (res) {

          if(this.file !== undefined) {

            this.uploadService.upload(this.project.id, 'icon', this.file, BasePath.project).subscribe(
              url => {

                this.projectService.updateProject(this.project.id, this.nameForm.value, this.keyForm.value,
                  this.project.ownerId, new URL(url)).subscribe(
                  p => {

                    if(p !== null) {
                      this.presentToast(this.translateService.instant('project.settings.details.toast.update.success'), 'success', 'checkmark-circle-outline').then();
                      this.saved = true;
                    } else {
                      this.presentToast(this.translateService.instant('project.settings.details.toast.update.failed'), 'danger', 'alert-circle-outline').then();
                    }

                  }
                );
              }
            );

          } else {

            this.projectService.updateProject(this.project.id, this.nameForm.value, this.keyForm.value,
              this.project.ownerId, this.project.icon).subscribe(
              p => {

                if(p !== null) {
                  this.presentToast(this.translateService.instant('project.settings.details.toast.update.success'), 'success', 'checkmark-circle-outline').then();
                } else {
                  this.presentToast(this.translateService.instant('project.settings.details.toast.update.failed'), 'danger', 'alert-circle-outline').then();
                }

              }
            );

          }

        }

      });

  }

  delete() {

    this.showAlert(this.translateService.instant('project.settings.details.alert.delete.title'),
      this.translateService.instant('project.settings.details.alert.delete.message.sure'),
      this.translateService.instant('wizard.alert.message.button.cancel'),
      this.translateService.instant('wizard.alert.message.button.confirm'))
      .then(res => {

        if (res) {

          this.projectService.deleteProject(this.project.id).subscribe(
            p => {

              if(p === null) {

                this.router.navigate(['home']).then(
                  e => this.presentToast(this.translateService.instant('project.settings.details.toast.delete.success'), 'success', 'checkmark-circle-outline').then()
                );

              } else {
                this.presentToast(this.translateService.instant('project.settings.details.toast.delete.failed'), 'danger', 'alert-circle-outline').then();
              }

            }
          );

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

  verifyChanges() {
    return this.nameForm.value === this.project?.name &&
           this.keyForm.value  === this.project?.key  &&
           this.file           === undefined;
  }

}
