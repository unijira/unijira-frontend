import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../models/item/Item';

@Component({
  selector: 'app-backlog-edit-submenu-popovers',
  templateUrl: './backlog-edit-submenu-popovers.component.html',
  styleUrls: ['./backlog-edit-submenu-popovers.component.scss'],
})
export class BacklogEditSubmenuPopoversComponent implements OnInit {
  @Input() task: Item;
  constructor() { }

  ngOnInit() {}

}
