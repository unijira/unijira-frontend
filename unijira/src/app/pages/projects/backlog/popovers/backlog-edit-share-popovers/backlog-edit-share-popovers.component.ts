import {Component, Input, OnInit} from '@angular/core';
import {Item} from 'src/app/models/item/Item';

@Component({
  selector: 'app-backlog-edit-share-popovers',
  templateUrl: './backlog-edit-share-popovers.component.html',
  styleUrls: ['./backlog-edit-share-popovers.component.scss'],
})
export class BacklogEditSharePopoversComponent implements OnInit {
  @Input() task: Item;
  constructor() { }

  ngOnInit() {}

}
