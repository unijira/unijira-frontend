import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../../services/page.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private pageService: PageService) {
    this.pageService.setTitle(['project.pages.settings','project.pages.settings.notifications']);
  }

  ngOnInit() {
  }

}
