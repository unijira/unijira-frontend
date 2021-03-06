import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../models/item/Item';

@Component({
  selector: 'app-backlog-edit-link-popovers',
  templateUrl: './backlog-edit-link-popovers.component.html',
  styleUrls: ['./backlog-edit-link-popovers.component.scss'],
})
export class BacklogEditLinkPopoversComponent implements OnInit {
  @Input() task: Item;
  constructor() {}

  ngOnInit() {}
}
