import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
@Component({
  selector: 'app-backlog-edit-lock-popovers',
  templateUrl: './backlog-edit-lock-popovers.component.html',
  styleUrls: ['./backlog-edit-lock-popovers.component.scss'],
})
export class BacklogEditLockPopoversComponent implements OnInit {
  @Input() task: Task;
  constructor() { }

  ngOnInit() {}

}
