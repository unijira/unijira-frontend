import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../../services/page.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})
export class PermissionsPage implements OnInit {

  constructor(private pageService: PageService) {
    this.pageService.setTitle(['project.pages.settings','project.pages.settings.permissions']);
  }

  ngOnInit() {
  }

}
