import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Notify} from '../../models/Notify';
import {NotifyService} from '../../services/notification/notify.service';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  @Output() updateNotificationsCount = new EventEmitter<number>();

  notifications: Array<Notify> = null;

  constructor(
    private popover: PopoverController,
    private notifyService: NotifyService
  ) { }


  get sortedNotifications(): Array<Notify> {
    return this.notifications?.sort((a, b) => (a.read ? 1 : 0) - (b.read ? 1 : 0));
  }

  get unreadNotificationsCount(): number {
    return this.notifications?.filter(notify => !notify.read).length || 0;
  }



  ngOnInit() {
    this.moreNotifications(null);
  }

  public async show(e?: Event) {
    const popover = await this.popover.create({
      component: NotificationsComponent,
      cssClass: 'notifications-popover',
      event: e
    });
    return await popover.present();
  }


  mark(notify: Notify) {

    if(!notify.read) {

      notify.read = true;
      this.notifyService.markAsRead(notify.id);
      this.updateNotificationsCount.emit(this.unreadNotificationsCount);

    }

  }

  markAll() {

    if(this.unreadNotificationsCount > 0) {

      this.notifications.forEach(notify => notify.read = true);
      this.notifyService.markAllAsRead();
      this.updateNotificationsCount.emit(this.unreadNotificationsCount);

    }

  }

  moreNotifications(e?: CustomEvent) {
    this.notifyService.getNotifications(this.notifications?.length || 0, 25).subscribe(
      (notifications: Array<Notify>) => {
        this.notifications = notifications;
        this.updateNotificationsCount.emit(this.unreadNotificationsCount);
      }
    );
  }

}
