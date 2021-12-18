import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {IonSlides} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {ProjectService} from '../../../services/common/project.service';
import {Project} from '../../../models/projects/Project';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage implements OnInit {

  @Input() url: string;

  @Input() invites: string[] = [];

  @ViewChild('wizardSlider') slides: IonSlides;

  mailForm: FormControl = new FormControl('', [Validators.required, Validators.email]);
  nameForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  keyForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  index: number;

  constructor(public alertController: AlertController,
              private translateService: TranslateService,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.index = 0;
    this.url = '';
  }

  invite() {

    this.mailForm.markAllAsTouched();
    this.mailForm.updateValueAndValidity();

    if (this.mailForm.valid && !this.invites.includes(this.mailForm.value)) {
      this.invites.push(this.mailForm.value);
    }

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

          if(res) {

            this.projectService.createProject(this.nameForm.value, this.keyForm.value, null)
              .subscribe(project => {

                if(project !== undefined) {

                    // TODO.. Move to project home

                }

            });

          }

      });

    }

  }

  async showAlert(header: any, message: any, cancel: any, confirm: any): Promise<any> {

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

  onChangeTime(value: any) {

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

}
