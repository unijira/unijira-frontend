import {AfterViewInit, Component} from '@angular/core';
import {PageService} from '../../../../../services/page.service';
import {SessionService} from '../../../../../store/session.service';
import {ActivatedRoute} from '@angular/router';
import {ReleaseService} from '../../../../../services/release/release.service';
import {Release} from '../../../../../models/releases/Release';
import {ReleaseStatus} from '../../../../../models/releases/ReleaseStatus';
import {AlertController, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Item} from '../../../../../models/item/Item';
import {DateUtils} from '../../../../../classes/date-utils';
import * as moment from 'moment';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements AfterViewInit {

  projectId: number = null;
  initialRelease: string = null;
  release: Release = null;
  releaseStatus = ReleaseStatus;
  tickets: Item[] = null;

  constructor(
    private pageService: PageService,
    private sessionService: SessionService,
    private releaseService: ReleaseService,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  get dirty(): boolean {
    return JSON.stringify(this.release || {}) !== this.initialRelease;
  }

  get progress(): number {

    const dayOfYear = (date: Date): number => Math.floor(date.getFullYear() * 365.25 + date.getMonth() * 30.4375 + date.getDate());

    const n = dayOfYear(new Date(Date.now()));
    const s = dayOfYear(new Date(this.release?.startDate));
    const e = dayOfYear(new Date(this.release?.endDate));

    return Math.max(0, (n - s) / (e - s));

  }

  get progressColor(): string {

    if(this.progress > 1.0) {
      return 'danger';
    } else {
      return 'success';
    }

  }

  get endDateMinusOne(): Date {
    return moment(this.release?.endDate ?? new Date(), 'YYYY-MM-DD').subtract(1, 'days').toDate();
  }

  get startDatePlusOne(): Date {
    return moment(this.release?.startDate ?? new Date(), 'YYYY-MM-DD').add(1, 'days').toDate();
  }

  get startDate(): Date {
    return moment(this.release?.startDate ?? new Date(), 'YYYY-MM-DD').toDate();
  }

  get endDate(): Date {
    return moment(this.release?.endDate ?? new Date(), 'YYYY-MM-DD').toDate();
  }


  ngAfterViewInit() {

    this.pageService.setTitle('projects.releases.title');

    this.activatedRoute.params.subscribe(params => {

      this.projectId = params.id;
      this.sessionService.loadProject(params.id);

      this.releaseService.getRelease(this.projectId, params.release).subscribe(release => {

        this.pageService.setTitle(['projects.releases.title' , `${release.version}`]);
        this.initialRelease = JSON.stringify(release);
        this.release = release;

        this.releaseService.getTickets(this.projectId, this.release.id).subscribe(tickets => {
          this.tickets = tickets ?? [];
        });

      });

    });

  }


  archive() {
    this.release.status = ReleaseStatus.archived;
    this.save();
  }

  publish() {
    this.release.status = ReleaseStatus.released;
    this.save();
  }

  save() {
    this.releaseService.updateRelease(this.projectId, this.release).subscribe(release => {
      if(release) {

        this.initialRelease = JSON.stringify(release);
        this.release = release;

        this.toastController.create({
          message: this.translateService.instant('projects.releases.toast.save.success'),
          color: 'success',
          duration: 3000,
          icon: 'checkmark-circle-outline',
        }).then(toast => toast.present());

      } else {
        this.alertController.create({
          header: this.translateService.instant('error.title'),
          message: this.translateService.instant('error.projects.releases.view.save'),
          buttons: [this.translateService.instant('error.buttons.ok')]
        }).then(alert => alert.present());
      }
    });
  }

  parseDate(date: string | null): string {
    return date
      ? DateUtils.toLocalDate(new Date(date))
      : DateUtils.toLocalDate();
  }

}
