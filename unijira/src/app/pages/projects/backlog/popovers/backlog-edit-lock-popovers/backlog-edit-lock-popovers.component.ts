import {Component, Input, OnInit} from '@angular/core';
import {Item} from 'src/app/models/item/Item';

@Component({
  selector: 'app-backlog-edit-lock-popovers',
  templateUrl: './backlog-edit-lock-popovers.component.html',
  styleUrls: ['./backlog-edit-lock-popovers.component.scss'],
})
export class BacklogEditLockPopoversComponent implements OnInit {
  @Input() task: Item;
  constructor() { }

  ngOnInit() {}

}
