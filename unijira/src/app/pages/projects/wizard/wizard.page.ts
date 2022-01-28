import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AlertController, IonSlides, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {PageService} from '../../../services/page.service';
import {Subscription} from 'rxjs';
import {UserInfo} from '../../../models/users/UserInfo';
import {SessionService} from '../../../store/session.service';
import {ProjectService} from '../../../services/project/project.service';
import {BasePath, FileUploadService} from '../../../services/file-upload/file-upload.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage implements OnInit {

  @Input() file: File;
  @Input() image: string;

  @Input() invites: string[] = [];

  @ViewChild('wizardSlider') slides: IonSlides;

  mailForm: FormControl = new FormControl('', [Validators.required, Validators.email]);
  nameForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  keyForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  userInfoSubscription: Subscription;
  userInfo: UserInfo;

  index: number;

  constructor(private sessionService: SessionService,
              public alertController: AlertController,
              private translateService: TranslateService,
              private projectService: ProjectService,
              private uploadService: FileUploadService,
              private db: AngularFireDatabase,
              private router: Router,
              public toastController: ToastController,
              private pageService: PageService) {

    this.pageService.setTitle('wizard.title');

    this.userInfoSubscription = sessionService.getUserInfo().subscribe(info => this.userInfo = info);

  }

  ngOnInit() {
    this.index = 0;
    this.image = '';
  }

  invite() {

    if(this.mailForm.value === this.userInfo.username) {
      return;
    }

    this.mailForm.markAllAsTouched();
    this.mailForm.updateValueAndValidity();

    if (this.mailForm.valid && !this.invites.includes(this.mailForm.value)) {
      this.invites.push(this.mailForm.value);
    }

    this.mailForm.setValue('');

  }

  delete(invites: string) {
    this.invites = this.invites.filter(obj => obj !== invites);
  }

  validation() {
    return this.index === 0 ? this.nameForm.value.length >= 3 && this.keyForm.value.length >= 3 : true;
  }

  updateProject() {

    if (this.index === 0) {

      this.slides.slideTo(1).then(null);
      this.index = 1;

    } else if (this.index === 1) {

      this.showAlert(this.translateService.instant('wizard.alert.title'),
                     this.translateService.instant(this.invites.length === 0 ?
                                                            'wizard.alert.message.invite' :
                                                            'wizard.alert.message.sure'),
                     this.translateService.instant('wizard.alert.message.button.cancel'),
                     this.translateService.instant('wizard.alert.message.button.confirm'))
        .then(res => {

          if (res) {

            this.projectService.createProject(this.nameForm.value, this.keyForm.value, null)
              .subscribe(project => {

                if (project !== null) {

                  if(this.invites.length > 0) {
                    this.projectService.sendInvitations(project.id, this.invites).subscribe();
                  }

                  if(this.file !== undefined) {

                    this.uploadService.upload(project.id, 'icon', this.file, BasePath.project).subscribe(
                      url => {

                        this.projectService.updateProject(project.id, project.name, project.key, project.ownerId, new URL(url)).subscribe(
                          () => this.router.navigate(['/projects/' + project.id]).then(t =>
                            this.presentToast(this.translateService.instant('wizard.toast.success')).then())
                        );

                      }
                    );

                  } else {
                    this.router.navigate(['/projects/' + project.id]).then(t =>
                      this.presentToast(this.translateService.instant('wizard.toast.success')).then());
                  }

                } else {
                  this.router.navigate(['/home']).then(t =>
                    this.presentToast(this.translateService.instant('wizard.toast.failed')).then());
                }

              });

          }

      });

    }

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 4000
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

}
