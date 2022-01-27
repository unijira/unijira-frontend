import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../models/item/Item';

@Component({
  selector: 'app-backlog-edit-like-popovers',
  templateUrl: './backlog-edit-like-popovers.component.html',
  styleUrls: ['./backlog-edit-like-popovers.component.scss'],
})
export class BacklogEditLikePopoversComponent implements OnInit {
  @Input() task: Item;
  constructor() {}
  ngOnInit() {}
}
