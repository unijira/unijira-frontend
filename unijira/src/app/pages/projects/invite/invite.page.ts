import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../../services/project/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, IonSlides, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {PageService} from '../../../services/page.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {switchColorTheme, switchLanguage, validateConfirmPassword} from '../../../util';
import {UserService} from '../../../services/user/user.service';
import {UserPasswordReset} from '../../../models/users/UserPasswordReset';
import {SessionService} from '../../../store/session.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit,AfterViewInit {

  @ViewChild('inviteSlider') slides: IonSlides;

  token: string;
  resetPassword: string;

  passwordFC1: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')
  ]);

  passwordFC2: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'),
  ]);

  passwordFG: FormGroup = new FormGroup({
    password1: this.passwordFC1,
    password2: this.passwordFC2,
  }, (g: FormGroup) => validateConfirmPassword(g));

  constructor(public alertController: AlertController,
              public translateService: TranslateService,
              private projectService: ProjectService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              public toastController: ToastController,
              private pageService: PageService,
              private sessionService: SessionService) {


    this.pageService.setTitle('project.pages.invite.title');

    this.route.queryParams.subscribe(param => {

      this.token = param.q;
      this.resetPassword = param.k;

      console.log(this.token);
      console.log(this.resetPassword);

    });

  }

  get currentColorTheme() {
    return document.body.getAttribute('color-theme');
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

  accept() {

    this.projectService.acceptInvite(this.token).subscribe(results => {

        if(results) {

            this.showAlert(this.translateService.instant('project.invite.alert.success.title'),
                    this.translateService.instant('project.invite.alert.success.message'),
                    this.translateService.instant('project.invite.alert.success.confirm')).then(res => {

                  if(res) {
                    this.sessionService.logout();
                  }

              });

        } else {

          this.showAlert(this.translateService.instant('project.invite.alert.failed.title'),
            this.translateService.instant('project.invite.alert.failed.message'),
            this.translateService.instant('project.invite.alert.failed.confirm')).then(res => {

              if(res) {
                this.sessionService.logout();
              }

          });

        }

    });

  }

  updatePassword() {

    this.userService.resetPasswordWithToken(new UserPasswordReset(this.passwordFC1.value, this.token)).subscribe(i => {

      if(i) {

        this.slides.slideTo(1).then(null);
        this.presentToast(this.translateService.instant('project.invite.toast.success')).then();

      } else {
        this.presentToast(this.translateService.instant('project.invite.toast.failed')).then();
      }

    });

  }

  async presentToast(message: string) {

    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 4000
    });

    await toast.present();

  }

  async showAlert(header: string, message: string, confirm: string): Promise<any> {

    return new Promise(async (resolve) => {

      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
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

  switchLanguage() {
    switchLanguage(this.translateService);
  }

  onToggleColorTheme(event) {
    switchColorTheme(event.detail.checked);
  }

}
