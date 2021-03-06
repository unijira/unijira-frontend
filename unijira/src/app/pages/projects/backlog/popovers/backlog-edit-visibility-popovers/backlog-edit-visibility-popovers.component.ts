import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../models/item/Item';
@Component({
  selector: 'app-backlog-edit-visibility-popovers',
  templateUrl: './backlog-edit-visibility-popovers.component.html',
  styleUrls: ['./backlog-edit-visibility-popovers.component.scss'],
})
export class BacklogEditVisibilityPopoversComponent implements OnInit {
  @Input() task: Item;
  constructor() {}
  ngOnInit() {}
}
