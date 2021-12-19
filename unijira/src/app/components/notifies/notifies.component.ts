import {Component, OnInit} from '@angular/core';
import {Notify} from '../../models/Notify';
import {NotifyService} from '../../services/common/notify.service';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-notifies',
  templateUrl: './notifies.component.html',
  styleUrls: ['./notifies.component.scss'],
})
export class NotifiesComponent implements OnInit {

  notifies: Array<Notify> = null;

  constructor(
    private popover: PopoverController,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.moreNotifies(null);
  }

  moreNotifies(e?: CustomEvent) {
    console.log(e);
    this.notifyService.getNotifies(this.notifies?.length || 0, 25).subscribe(
      (notifies: Array<Notify>) => {
        this.notifies = notifies;
      }
    );
  }

  public async show(e?: Event) {
    const popover = await this.popover.create({
      component: NotifiesComponent,
      cssClass: 'notifies-popover',
      event: e
    });
    return await popover.present();
  }

  private mark(notify: Notify) {
    // this.notifyService.mark(notify).subscribe(
    //   (notify: Notify) => {
    //     this.notifies = this.notifies.map(
    //       (n: Notify) => n.id === notify.id ? notify : n
    //     );
    //   }
    // );
  }

}
