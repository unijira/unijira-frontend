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


  get sortedNotifies(): Array<Notify> {
    return this.notifies?.sort((a, b) => (a.read ? 1 : 0) - (b.read ? 1 : 0));
  }

  get unreadNotifiesCount(): number {
    return this.notifies?.filter(notify => !notify.read).length || 0;
  }



  ngOnInit() {
    this.moreNotifies(null);
  }

  public async show(e?: Event) {
    const popover = await this.popover.create({
      component: NotifiesComponent,
      cssClass: 'notifies-popover',
      event: e
    });
    return await popover.present();
  }


  mark(notify: Notify) {

    if(!notify.read) {

      notify.read = true;
      this.notifyService.markAsRead(notify.id);

    }

  }

  markAll() {

    if(this.unreadNotifiesCount > 0) {

      this.notifies.forEach(notify => notify.read = true);
      this.notifyService.markAllAsRead();

    }

  }

  moreNotifies(e?: CustomEvent) {
    this.notifyService.getNotifies(this.notifies?.length || 0, 25).subscribe(
      (notifies: Array<Notify>) => {
        this.notifies = notifies;
      }
    );
  }

}
