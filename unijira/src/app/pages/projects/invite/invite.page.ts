import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/common/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {

  token: string;

  constructor(public alertController: AlertController,
              private translateService: TranslateService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  accept() {

    this.route.queryParams.subscribe(param => {
      this.token = param.q;
    });

    this.projectService.acceptInvite(this.token).subscribe(results => {

        if(results) {

            this.showAlert(this.translateService.instant('project.invite.alert.success.title'),
                    this.translateService.instant('project.invite.alert.success.message'),
                    this.translateService.instant('project.invite.alert.success.confirm')).then(res => {

                  if(res) {
                    // TODO.. Move to project home
                    // this.router.navigate(['/projects/']);
                  }

              });

        } else {

          this.showAlert(this.translateService.instant('project.invite.alert.failed.title'),
            this.translateService.instant('project.invite.alert.failed.message'),
            this.translateService.instant('project.invite.alert.failed.confirm')).then(res => {

              if(res) {
                  this.router.navigate(['/login']).then();
              }

          });

        }

    });

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

}
