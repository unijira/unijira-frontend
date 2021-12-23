import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../models/Task';

@Component({
  selector: 'app-backlog-edit-like-popovers',
  templateUrl: './backlog-edit-like-popovers.component.html',
  styleUrls: ['./backlog-edit-like-popovers.component.scss'],
})
export class BacklogEditLikePopoversComponent implements OnInit {
  @Input() task: Task;
  constructor() {}
  ngOnInit() {}
}
