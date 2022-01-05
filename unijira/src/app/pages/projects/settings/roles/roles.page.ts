import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../../services/page.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {

  constructor(private pageService: PageService) {
    this.pageService.setTitle(['project.pages.settings','project.pages.settings.roles']);
  }

  ngOnInit() {
  }

}
