import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../models/Task';

@Component({
  selector: 'app-backlog-edit-submenu-popovers',
  templateUrl: './backlog-edit-submenu-popovers.component.html',
  styleUrls: ['./backlog-edit-submenu-popovers.component.scss'],
})
export class BacklogEditSubmenuPopoversComponent implements OnInit {
  @Input() task: Task;
  constructor() { }

  ngOnInit() {}

}
