import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AlertController, IonSlides} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {ProjectService} from '../../../services/common/project.service';
import {Router} from '@angular/router';
import {SessionService} from '../../../store/session.service';
import {FileUploadService} from '../../../services/common/file-upload.service';
import {AngularFireDatabase} from '@angular/fire/database';

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

  index: number;

  constructor(public alertController: AlertController,
              private translateService: TranslateService,
              private projectService: ProjectService,
              private uploadService: FileUploadService,
              private db: AngularFireDatabase,
              private router: Router) {}

  ngOnInit() {
    this.index = 0;
    this.image = '';
  }

  invite() {

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

                    this.uploadService.upload(project.id, 'icon', this.file).subscribe(
                      url => {

                        this.projectService.updateProject(project.id, project.name, project.key, project.ownerId, new URL(url)).subscribe(
                          () => this.router.navigate(['home/projects/' + project.id + '/project-home']).then()
                        );

                      }
                    );

                  } else {
                    this.router.navigate(['home/projects/' + project.id + '/project-home']).then();
                  }

                }

              });

          }

      });

    }

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

  onChangeTime(value: string) {

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

  }

}
